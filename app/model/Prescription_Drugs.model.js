module.exports = (sequelize, DataTypes) => {
    const app = sequelize.define("Prescription_Drugs", {
    
        Quantity: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Duration: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        drug_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            
        }, 
        prescription_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            
        },
        isActivated: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            
        },
        refailCount: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
            
        },
         
       
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return app;
};