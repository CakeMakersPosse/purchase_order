'use strict';
module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    ProductId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ProductName: DataTypes.STRING,
    AmountOnHand: DataTypes.INTEGER,
    Deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {});
  products.associate = function (models) {
    products.hasMany(models.purchase_orders, {
      foreignKey: 'PurchaseOrderId',
      constraints: false, 
      allowNull:true, 
      defaultValue:null
    });
  };
  return products;
};