
module.exports=function (sequelize, Datatypes) {
  var Restaurant = sequelize.define("Restaurant", {
    ID: {
      type: Datatypes.STRING,
      primaryKey: true,
    },
    NAME: {
      type: Datatypes.STRING,
      allowNull: false,
      len: [64],
    },
  });
  return Restaurant;
};


