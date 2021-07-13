module.exports = (sequelize, DataTypes) => {
    const labOrder = sequelize.define("labOrders", {
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
        labFDId: {
            type: DataTypes.INTEGER,
            allowNull: true,

        }, 
        labId:{
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


    return labOrder;
};