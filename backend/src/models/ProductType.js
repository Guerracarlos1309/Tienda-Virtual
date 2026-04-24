const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProductType = sequelize.define("ProductType", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = ProductType;
