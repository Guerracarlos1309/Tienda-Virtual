const { Product, ProductType, Category, ProductImage, sequelize } = require('../models');

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: ProductType,
          as: 'type',
          include: [{ model: Category, as: 'category' }]
        },
        {
          model: ProductImage,
          as: 'images'
        }
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: ProductImage, as: 'images' }, 'isPrimary', 'DESC']
      ]
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductTypes = async (req, res) => {
  try {
    const types = await ProductType.findAll({
      include: [{ model: Category, as: 'category' }]
    });
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { images, ...productData } = req.body;
    const product = await Product.create(productData, { transaction: t });

    if (images && images.length > 0) {
      const imageRecords = images.map((url, index) => ({
        url,
        isPrimary: index === 0,
        productId: product.id
      }));
      await ProductImage.bulkCreate(imageRecords, { transaction: t });
    }

    await t.commit();
    
    // Fetch the product with its images to return it
    const newProduct = await Product.findByPk(product.id, {
      include: [{ model: ProductImage, as: 'images' }]
    });
    
    res.status(201).json(newProduct);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { images, ...productData } = req.body;
    
    await Product.update(productData, { where: { id }, transaction: t });

    if (images) {
      // For simplicity, we delete old images and add new ones if provided
      // In a real app, we might want to be more granular (edit/delete specific)
      await ProductImage.destroy({ where: { productId: id }, transaction: t });
      
      const imageRecords = images.map((url, index) => ({
        url,
        isPrimary: index === 0,
        productId: id
      }));
      await ProductImage.bulkCreate(imageRecords, { transaction: t });
    }

    await t.commit();
    const updatedProduct = await Product.findByPk(id, {
      include: [{ model: ProductImage, as: 'images' }]
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // Images should be deleted automatically if we have CASCADE on delete
    // Let's check associations later, but for now we manually delete if needed
    await Product.destroy({ where: { id } });
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.update(req.body, { where: { id } });
    const updated = await Category.findByPk(id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.destroy({ where: { id } });
    res.status(200).json({ message: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProductType = async (req, res) => {
  try {
    const type = await ProductType.create(req.body);
    res.status(201).json(type);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProductType = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductType.update(req.body, { where: { id } });
    const updated = await ProductType.findByPk(id);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProductType = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductType.destroy({ where: { id } });
    res.status(200).json({ message: 'Tipo de producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductTypes,
  createProductType,
  updateProductType,
  deleteProductType,
  createProduct,
  updateProduct,
  deleteProduct
};
