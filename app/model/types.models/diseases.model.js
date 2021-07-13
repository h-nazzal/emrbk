module.exports = (sequelize, DataTypes) => {
    const diseases = sequelize.define("diseases", {
        idCode:{
            type: DataTypes.STRING,
        },
        code: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        abbreviation: {
            type: DataTypes.STRING,
        },
        isDeleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },
    });

    return diseases;
};