module.exports = (sequelize, DataTypes) => {
    const pathoFrontDisk = sequelize.define("pathoFrontDisk", {
        address: {
            type: DataTypes.STRING,
        },
        organization: {
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
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return pathoFrontDisk;
};