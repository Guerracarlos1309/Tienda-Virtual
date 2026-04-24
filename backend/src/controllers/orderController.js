const { Order, OrderItem, Product, Invoice, sequelize } = require('../models');

const checkout = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { customerName, customerEmail, phone, address, items } = req.body;
    let total = 0;

    // Create Order
    const order = await Order.create({
      customerName,
      customerEmail,
      phone,
      address,
      total: 0 // Will update later
    }, { transaction: t });

    for (const item of items) {
      const product = await Product.findByPk(item.id);
      if (!product) throw new Error(`Producto ${item.id} no encontrado`);
      
      const subtotal = product.price * item.quantity;
      total += subtotal;

      // Update Stock
      if (product.stock < item.quantity) {
        throw new Error(`Stock insuficiente para ${product.name}`);
      }
      await product.update({ stock: product.stock - item.quantity }, { transaction: t });

      await OrderItem.create({
        OrderId: order.id,
        ProductId: product.id,
        quantity: item.quantity,
        price: product.price,
        selectedAttributes: item.attributes
      }, { transaction: t });
    }

    await order.update({ total }, { transaction: t });

    // Generate Invoice
    const invoiceNumber = `INV-${order.id.toString().padStart(5, '0')}`;
    await Invoice.create({
      OrderId: order.id,
      invoiceNumber,
      subtotal: total,
      tax: total * 0.15, // Example tax
      total: total * 1.15
    }, { transaction: t });

    await t.commit();
    res.status(201).json({ message: 'Pedido realizado con éxito', orderId: order.id });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: OrderItem, as: 'items', include: [Product] },
        { model: Invoice }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [{ model: Order }]
    });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });
    
    await order.update({ status });
    res.status(200).json({ message: 'Estado actualizado', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  checkout,
  getOrders,
  getInvoices,
  updateStatus
};
