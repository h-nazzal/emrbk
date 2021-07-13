module.exports = (sequelize, DataTypes) => {
    const patho  = sequelize.define("patho", {
        idCode:{
            type: DataTypes.STRING,
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

    return patho;
};