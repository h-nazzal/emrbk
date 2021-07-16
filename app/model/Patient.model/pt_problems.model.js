module.exports = (sequelize, DataTypes) => {
  const pt = sequelize.define('pt_problems', {
    problem: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATEONLY
    },
    ptId: {
      type: DataTypes.INTEGER
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 'active'
    }
  })

  return pt
}
