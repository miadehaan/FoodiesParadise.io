module.exports = function (sequelize, Datatypes) {
  var dish = sequelize.define("dish", {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      len: [64],
    },

  });


  return dish;
};