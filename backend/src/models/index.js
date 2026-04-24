const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const ProductType = require('./ProductType');
const Product = require('./Product');
const ProductImage = require('./ProductImage');
const { Order, OrderItem } = require('./Order');
const { DataTypes } = require('sequelize');

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
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

// Normalized Hierarchy Associations
Category.hasMany(ProductType, { as: 'types', foreignKey: 'categoryId' });
ProductType.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' });

ProductType.hasMany(Product, { as: 'products', foreignKey: 'productTypeId' });
Product.belongsTo(ProductType, { as: 'type', foreignKey: 'productTypeId' });

Product.hasMany(ProductImage, { as: 'images', foreignKey: 'productId' });
ProductImage.belongsTo(Product, { as: 'product', foreignKey: 'productId' });

// Order Associations
Order.hasMany(OrderItem, { as: 'items' });
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Order.hasOne(Invoice);
Invoice.belongsTo(Order);

const db = {
  sequelize,
  User,
  Category,
  ProductType,
  Product,
  ProductImage,
  Order,
  OrderItem,
  Invoice
};

module.exports = db;
