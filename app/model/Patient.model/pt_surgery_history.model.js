module.exports = (sequelize, DataTypes) => {
    const pt = sequelize.define("pt_surgery_history", {
        name: {
            type: DataTypes.STRING,
        },
        notes: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATEONLY,
        },
        ptId:{
            type:DataTypes.INTEGER
        },  
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return pt;
};