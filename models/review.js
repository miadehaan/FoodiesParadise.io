module.exports=function (sequelize, Datatypes) {
  var review = sequelize.define("Review", {
    ID: {
      type: Datatypes.STRING,
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
        type: Datatypes.STRING,
      },
  });
  
  review.associate = function (models) {
    review.belongsTo(models.Dish, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return review;
}
