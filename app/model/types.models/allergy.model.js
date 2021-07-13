module.exports = (sequelize, DataTypes) => {
    const Allergy = sequelize.define("allergy", {
      idCode:{
        type:DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      isDeleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  
    return Allergy;
  };