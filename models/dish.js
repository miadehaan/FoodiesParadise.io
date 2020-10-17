module.exports=function(sequelize, Datatypes) {
    var Dish = sequelize.define("Dish", {
      NAME: {
        type: Datatypes.STRING,
        allowNull: false,
        len: [64],
      },
      RID: {
        type: Datatypes.STRING,
      },
    });
  
    Dish.associate = function (models) {
        Dish.hasMany(models.Restaurant, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
    return Dish;
  };