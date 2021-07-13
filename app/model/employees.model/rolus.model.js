module.exports = (sequelize, DataTypes) => {
    const roules = sequelize.define("permission", {
        role: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
        },  
    });

    return roules;
};