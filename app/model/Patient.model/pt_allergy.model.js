module.exports = (sequelize, DataTypes) => {
    const pt_allergies = sequelize.define("pt_allergies", {
        name: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.STRING,
        },
        date:{
            type:DataTypes.DATEONLY,
        },
        ptId:{
            type:DataTypes.INTEGER
        },  
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return pt_allergies;
};