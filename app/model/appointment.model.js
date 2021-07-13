module.exports = (sequelize, DataTypes) => {
  const app = sequelize.define('appoinment', {
    startDate: {
      type: DataTypes.TIME
    },
    endDate: {
      type: DataTypes.TIME
    },
    reason: {
      type: DataTypes.STRING
    },
    patientName: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATEONLY
    },
    drFDId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    drId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ptId: {
      type: DataTypes.INTEGER
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  return app
}
