module.exports = (sequelize, DataTypes) => {
    const app = sequelize.define("visits", {
        chiefComplains: {
            type: DataTypes.STRING,
        },
        diagnosis: {
            type: DataTypes.STRING,
        },
        surgeryDate: {
            type: DataTypes.STRING,
        },
        surgeries: {
            type: DataTypes.STRING,
        },
        interventionDate: {
            type: DataTypes.STRING,
            
        },
        deasesId: {
            type: DataTypes.STRING,

        },  
        interventions: {
            type: DataTypes.STRING,

        }, 
        ptId: {
            type: DataTypes.INTEGER,
           
        }, 
        drId: {
            type: DataTypes.INTEGER,
           
        },      
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return app;
};