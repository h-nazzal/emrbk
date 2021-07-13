module.exports = (sequelize, DataTypes) => {
    const aa = sequelize.define("pt_interventions", {
        name: {
            type: DataTypes.STRING,
        },
        notes: {
            type: DataTypes.STRING,
        },
        ptId:{
            type:DataTypes.INTEGER
        },  
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return aa;
};