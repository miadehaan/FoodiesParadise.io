module.exports = function (sequelize, Datatypes) {
  var Restaurant = sequelize.define("Restaurant", {
    NAME: {
      type: Datatypes.STRING,
      allowNull: false,
      len: [64],
    },
  });
  Restaurant.associate = function (models) {
    Restaurant.hasMany(models.Dish, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Restaurant;
};