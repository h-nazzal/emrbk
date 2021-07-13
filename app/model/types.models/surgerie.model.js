module.exports = (sequelize, DataTypes) => {
    const surgerie  = sequelize.define("surgerie", {
        abbreviation: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        idCode: {
            type: DataTypes.STRING,
        },
        isDeleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },
    });

    return surgerie;
};