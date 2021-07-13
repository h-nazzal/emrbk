module.exports = (sequelize, DataTypes) => {
    const radiogist = sequelize.define("radiogist", {
        firstName: {
            type: DataTypes.STRING,
        },
        secondName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        idCode: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
        },  
        radioFDId: {
            type: DataTypes.INTEGER,
        },   
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return radiogist;
};