function restaurant(sequelize, Datatypes) {
  var Rest = sequelize.define("Restaurants", {
    ID: {
      type: Datatypes.INT,
      primaryKey: true,
    },
    NAME: {
      type: Datatypes.STRING,
      allowNull: false,
      len: [64],
    },
  });
  return Rest;
}

function dishes(sequelize, Datatypes) {
  var Dishes = sequelize.define("Dishes", {
    ID: {
      type: Datatypes.INT,
      primaryKey: true,
    },
    NAME: {
      type: Datatypes.STRING,
      allowNull: false,
      len: [64],
    },
    RID: {
      type: Datatypes.INT,
    },
  });

  Food.associate = function (models) {
    Food.belongsTo(models.Restaurants, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Dishes;
}

module.exports = restaurant;
module.exports = dishes;
