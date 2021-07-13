module.exports = (sequelize, DataTypes) => {
    const drug = sequelize.define("drugs", {
        name: {
            type: DataTypes.STRING,
        },
        isDeleted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },
    });

    return drug;
};