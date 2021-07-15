module.exports = (sequelize, DataTypes) => {
  const NurseModule = sequelize.define('NurseModule', {
    bloodPressure: {
      type: DataTypes.STRING
    },
    pulse: {
      type: DataTypes.STRING
    },
    cigarettes: {
      type: DataTypes.STRING
    },
    temperature: {
      type: DataTypes.STRING
    },
    oxygenSaturation: {
      type: DataTypes.STRING
    },
    bloodGlucoseLevel: {
      type: DataTypes.STRING
    },
    time: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.STRING
    },
    nurseId: {
      type: DataTypes.INTEGER
    },
    pId: {
      type: DataTypes.INTEGER
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  return NurseModule
}
