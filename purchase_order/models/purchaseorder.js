'use strict';
module.exports = (sequelize, DataTypes) => {
  const purchase_orders = sequelize.define('purchase_orders', {
    PurchaseOrderId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    Username: DataTypes.STRING,
    ProductId: DataTypes.INTEGER,
    AmountOrdered: DataTypes.INTEGER,
    Deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  purchase_orders.associate = function (models) {
    purchase_orders.belongsTo(models.users, {
      foreignKey: 'UserId'
    });
    purchase_orders.hasMany(models.products, {
      foreignKey: 'ProductId'
    });
  };
  return purchase_orders;
};