module.exports = function (sequelize, Datatypes) {
  var restaurant = sequelize.define("restaurant", {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      len: [64],
    },
  });
  restaurant.associate = function (models) {
    restaurant.hasMany(models.dish, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return restaurant;
};