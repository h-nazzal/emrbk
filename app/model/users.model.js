module.exports = (sequelize, DataTypes) => {
  const USER = sequelize.define('users', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },

    Token: {
      type: DataTypes.STRING
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  })

  return USER
}
