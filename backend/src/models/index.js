const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const { Order, OrderItem } = require('./Order');
const { DataTypes } = require('sequelize');

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  invoiceNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2)
  },
  tax: {
    type: DataTypes.DECIMAL(10, 2)
  },
  total: {
    type: DataTypes.DECIMAL(10, 2)
  }
});

// Associations
Order.hasMany(OrderItem, { as: 'items' });
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Order.hasOne(Invoice);
Invoice.belongsTo(Order);

const db = {
  sequelize,
  User,
  Product,
  Order,
  OrderItem,
  Invoice
};

module.exports = db;
