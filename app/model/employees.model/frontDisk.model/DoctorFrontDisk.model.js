module.exports = (sequelize, DataTypes) => {
    const DoctorFD = sequelize.define("doctorFD", {
        address: {
            type: DataTypes.STRING,
        },
        organization: {
            type: DataTypes.STRING,
        },
        contactPerson: {
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

    return DoctorFD;
};