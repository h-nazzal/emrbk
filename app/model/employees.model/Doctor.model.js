module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define("doctor", {
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        specialty: {
            type: DataTypes.STRING,
        },
        DRFDId :{
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

    return Doctor;
};