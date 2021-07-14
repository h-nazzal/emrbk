module.exports = (sequelize, DataTypes) => {
  const app = sequelize.define('Prescription', {
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    visit_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ptId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    drId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    result: {
      type: DataTypes.STRING,
      allowNull: true
    },

    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  })

  return app
}
