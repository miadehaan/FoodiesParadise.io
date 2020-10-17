function review(sequelize, Datatypes) {
  var review = sequelize.define("Review", {
    ID: {
      type: Datatypes.INT,
      primaryKey: true,
    },
    NAME: {
      type: Datatypes.STRING,
      allowNull: false,
      len: [64],
    },
    COMMENTS: {
      type: Datatypes.STRING,
      allowNull: false,
      len: [64],
    },
    RATING: {
      type: Datatypes.STRING,
      allowNull: false,
      len: [64],
    },
    DID: {
        type: Datatypes.INT,
      },
  });
  
  review.associate = function (models) {
    review.belongsTo(models.Dish, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
}
