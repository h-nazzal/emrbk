module.exports = (sequelize, DataTypes) => {
    const radioOrder = sequelize.define("radioOrders", {
        Date: {
            type: DataTypes.DATEONLY,
        },
        comments: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.STRING,
        },
        result: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        radioFDId: {
            type: DataTypes.INTEGER,
            allowNull: true,

        },  
        radioId:{
            type:DataTypes.INTEGER,
        }, 
        drId: {
            type: DataTypes.INTEGER,
        }, 
        ptId: {
            type: DataTypes.INTEGER,
           
        },       
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return radioOrder;
};