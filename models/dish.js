module.exports=function(sequelize, Datatypes) {
    var Dish = sequelize.define("Dish", {
      ID: {
        type: Datatypes.STRING,
        primaryKey: true,
      },
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
        Dish.belongsTo(models.Restaurant, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
    return Dish;
  };