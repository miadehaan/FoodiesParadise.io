module.exports = function (sequelize, Datatypes) {
  var dish = sequelize.define("dish", {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      len: [64],
    },
  });
  dish.associate = function (models) {
    dish.hasMany(models.review, {
      foreignKey: {
        allowNull: false,
      },
    });
    dish.belongsTo(models.restaurant, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return dish;
};
