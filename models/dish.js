module.exports = function (sequelize, Datatypes) {
  var Dish = sequelize.define("Dish", {
    NAME: {
      type: Datatypes.STRING,
      allowNull: false,
      len: [64],
    },

  });

  return Dish;
};