module.exports = (sequelize, DataTypes) => {
    const nurse = sequelize.define("nurse", {
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        secondName: {
            type: DataTypes.STRING,
        },
        idCode: {
            type: DataTypes.STRING,
        },
        drId: {
            type: DataTypes.INTEGER,
        },
        phone: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
        },    
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return nurse;
};