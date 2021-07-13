module.exports = (sequelize, DataTypes) => {
    const labs  = sequelize.define("labs", {
        idCode:{
            type:DataTypes.STRING
        },
        abbreviation: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        isDeleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },
    });

    return labs;
};