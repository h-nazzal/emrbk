const db2 = require('../dataBase/dataBaseConnection')

module.exports = app => {
  const Ses = require('../controllers/session.controller')

  var router = require('express').Router()

  // Create a new seesion
  router.post('/createSession', Ses.create)

  router.get('/getSessionByDate', async function (req, res) {
    let date = new Date()
    var dt = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
    var yesterday = new Date(date.getTime() - 24 * 60 * 60 * 1000)
    var tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000)

    tomorrow = tomorrow
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')
    yesterday = yesterday
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')
    dt = date
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')

    console.log('asssss')
    var sql =
      "SELECT V.* , P.firstName,P.secondName,P.lastName,P.phone,P.address FROM visits V JOIN Patients P on V.ptId = P.id WHERE V.isDeleted = 0 and V.createdAt BETWEEN '" +
      yesterday +
      "' and  '" +
      tomorrow +
      "'"

    console.log(sql)
    db2.query(sql, function (err, result) {
      if (err) {
        console.log('errorrrrrrrrr:   ', err)
        res.send(err)
      } else {
        if (result.length === 0) {
          console.log(result)
          res.send(result)
        } else {
          res.send(result)
          //var modify = new modifyFunction();
          // modify.getseesion(result).then(rfinal=>{
          //res.send(rfinal);
          //   })
          console.log(result)
        }
      }
    })
  })

  app.use('/session', router)
}
