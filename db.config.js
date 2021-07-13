module.exports = {
  // HOST: 'remotemysql.com',
  // USER: '9xLrCX8r7m',
  // PASSWORD: 'QlkietjIvp',
  // DB: '9xLrCX8r7m',
  // dialect: 'mysql',

  host: 'bors1xaysbbbx0yiipww-mysql.services.clever-cloud.com',
  user: 'uttntpsvobkaxgyk',
  password: 'n6dXeYhOfwwt2Wfykfui',
  database: 'bors1xaysbbbx0yiipww',
  dialect: 'mysql',
  port: '3306',
  connectionLimit: 5,
  // logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
