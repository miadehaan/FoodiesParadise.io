
module.exports=function (sequelize, Datatypes) {
  var review = sequelize.define("review", {
    name: {
      type: Datatypes.STRING,
      allowNull: false,
      len: [64],
    },
    comments: {
      type: Datatypes.STRING,
      allowNull: false,
      len: [64],
    },
    rating: {
      type: Datatypes.STRING,
      allowNull: false,
      len: [64],
    },
  });
  
  review.associate = function (models) {
    review.belongsTo(models.dish, {
      foreignKey: {
        allowNull: true,
      },
    });
  };
  return review;
}
