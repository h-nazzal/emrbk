module.exports = (sequelize, DataTypes) => {
    const Assistant = sequelize.define("assistant", {
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        secondName: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
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

    return Assistant;
};