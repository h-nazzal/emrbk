module.exports = (sequelize, DataTypes) => {
    const pt = sequelize.define("Patients", {
        
        firstName: {
            type: DataTypes.STRING,
        }, 
        secondName: {
            type: DataTypes.STRING,
           
        },      
        lastName: {
            type: DataTypes.STRING,
           
        }, 
        gender: {
            type: DataTypes.STRING,
           
        }, 
        phone: {
            type: DataTypes.INTEGER,
        },
        address: {
            type: DataTypes.STRING,
        },
        birthDate: {
            type: DataTypes.DATEONLY,
        },
        maritalStatus: {
            type: DataTypes.STRING,
        },
        bloodGroup: {
            type: DataTypes.STRING,

        },  
        ptCode: {
            type: DataTypes.INTEGER,
        },
        userId:{
            type:DataTypes.INTEGER
        },  
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return pt;
};