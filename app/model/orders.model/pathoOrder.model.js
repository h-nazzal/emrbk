module.exports = (sequelize, DataTypes) => {
    const pathoOrder = sequelize.define("pathoOrders", {
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
        pathoFDId: {
            type: DataTypes.INTEGER,
            allowNull: true,

        },  
        pathoId:{
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

    return pathoOrder;
};