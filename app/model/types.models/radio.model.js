module.exports = (sequelize, DataTypes) => {
    const radio  = sequelize.define("radio", {
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

    return radio;
};