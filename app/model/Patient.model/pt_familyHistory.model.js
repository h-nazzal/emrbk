module.exports = (sequelize, DataTypes) => {
    const fa = sequelize.define("pt_familyHistory", {
        relation: {
            type: DataTypes.STRING,
        },
        problem: {
            type: DataTypes.STRING,
        },
        notes:{
            type:DataTypes.STRING
        },  
        ptId:{
            type:DataTypes.INTEGER
        },  
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return fa;
};