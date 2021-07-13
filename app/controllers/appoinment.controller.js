const db = require('../model')
const db2 = require('../dataBase/dataBaseConnection')
const Appoinment = db.appoinment
const Dr = db.doctor
const DrFD = db.doctorFD
const PT = db.pt
const Op = db.Sequelize.Op
var app = {
  startDate: '',
  endDate: '',
  date: '',
  ptId: '',
  drFDId: null,
  drId: null
}
// Create and Save a new Appoinment
exports.create = (req, res) => {
  var stop = 1
  console.log('hello')
  if (!req.body.patientCode || !req.body.startTime) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }
  app['date'] = req.body.date
  app['startDate'] = req.body.startTime

  //get drId or FDID by req.id

  check(req)
    .then(ress => {
      PT.findAll({
        where: {
          ptCode: req.body.patientCode
        }
      })
        .then(data => {
          if (data.length === 0) {
            var mes = 'no user with this code'
            res.send({ message: mes })
            return
          }

          // set start and end DAtes
          app['ptId'] = data[0].id
          var s = parseInt(req.body.duration)
          var a = req.body.startTime.split(':')
          var hour = parseInt(a[0])
          if (hour > 12) hour = hour - 12
          var min = parseInt(a[1])
          //console.log()
          while (true) {
            if (min + s > 60) {
              hour += 1
              s -= 60
            } else {
              min += s
              break
            }
          }
          console.log('aafaa', min)
          app['endDate'] = hour + ':' + min + ':00'
          getAppointment(req.body)
            .then(data1 => {
              console.log('iam here')
              if (data1.length === 0) {
                console.log(app)
                Appoinment.create(app)
                  .then(data2 => [res.send(data2)])
                  .catch(err => {
                    res.status(500).send({
                      message: err.message || 'error in create appoinment'
                    })
                  })
              } else {
                console.log(app + 'asdasd')
                var result = JSON.stringify(data1)
                var json = JSON.parse(result)
                for (var i = 0; i < json.length; i++) {
                  console.log('dasd')
                  var dt = new Date() //current Date that gives us current Time also
                  var startTime = json[i].startDate
                  var endTime = json[i].endDate
                  var test = req.body.startTime
                  test = test + ':00'
                  var s = startTime.split(':')
                  var dt1 = new Date(
                    dt.getFullYear(),
                    dt.getMonth(),
                    dt.getDate(),
                    parseInt(s[0]),
                    parseInt(s[1]),
                    parseInt(s[2])
                  )
                  var c = test.split(':')
                  console.log(c)
                  var dt3 = new Date(
                    dt.getFullYear(),
                    dt.getMonth(),
                    dt.getDate(),
                    parseInt(c[0]),
                    parseInt(c[1]),
                    parseInt(c[2])
                  )

                  var e = endTime.split(':')
                  var dt2 = new Date(
                    dt.getFullYear(),
                    dt.getMonth(),
                    dt.getDate(),
                    parseInt(e[0]),
                    parseInt(e[1]),
                    parseInt(e[2])
                  )
                  console.log(
                    dt3 >= dt1 && dt3 <= dt2
                      ? 'Current time is between startTime and endTime'
                      : 'Current time is NOT between startTime and endTime'
                  )
                  console.log(
                    'dt3 = ' + dt3 + ',  dt1 = ' + dt1 + ', dt2 =' + dt2
                  )
                  if (dt3 >= dt1 && dt3 <= dt2) {
                    stop = 0
                    res.send({
                      message: 'date is not empty'
                    })
                    break
                  }
                }
                if (stop === 0) return
                Appoinment.create(app)
                  .then(date0 => {
                    res.send(date0)
                  })
                  .catch(err => {
                    res.send({
                      message: err.message || 'error in insert appoinment'
                    })
                  })
              }
            })
            .catch(err => {
              res.status(500).send({
                message: err.message || 'error in create appoinment'
              })
            })
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || 'error in get ptid'
          })
        })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'error in create appoinment'
      })
    })
}

// Retrieve all appointment from the database.
exports.findAll = (req, res) => {
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  if (req.body.check == 'drFDId') {
    db2.query(
      'SELECT Lo.id , P.phone ,P.id as ptId, P.address , P.birthDate , P.firstName , P.lastName, P.secondName , Lo.startDate,Lo.endDate, Lo.reason ,Lo.date   from appoinments Lo Join Patients P on Lo.ptId = P.id  where date = ' +
        '"' +
        req.body.date +
        '" and drFDId = ' +
        req.body.id,
      function (err, result) {
        if (err) {
          res.status(500).send(err.message)
        } else {
          console.log('========================================')
          res.send(result)
        }
      }
    )
    //#region  oldCode
    // Appoinment.findAll({
    //     where: {
    //         isDeleted: false,
    //         date:req.body.date,
    //         drFDId:req.body.id,

    //     }

    // })
    //     .then(data => {
    //        // console.log(data)
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving appoinments."
    //         });
    //     });
    //#endregion
  } else {
    Dr.findOne({
      where: {
        userId: req.body.id
      }
    }).then(ress => {
      db2.query(
        'SELECT Lo.id ,P.id as ptId, P.phone , P.address , P.birthDate , P.firstName , P.lastName, P.secondName , Lo.startDate,Lo.endDate, Lo.reason ,Lo.date   from appoinments Lo Join Patients P on Lo.ptId = P.id  where Lo.isDeleted = 0 and date = ' +
          '"' +
          req.body.date +
          '" and drId = ' +
          ress.id,
        function (err, result) {
          if (err) {
            console.log('===================================================')
            res.status(500).send(err.message)
          } else {
            console.log('===================================================')
            console.log(req.body.date)
            console.log(result)
            res.send(result)
          }
        }
      )
    })

    //#region oldcode
    //     //app["drId"]=req.body.id;
    // Appoinment.findAll({
    //     where: {
    //         isDeleted: false,
    //         date:req.body.date,
    //         drId:req.body.id,

    //     }

    // })
    //     .then(data => {
    //         //console.log(data)
    //         res.send(data);
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message:
    //                 err.message || "Some error occurred while retrieving appoinments."
    //         });
    //     });
    //#endregion
  }
}
exports.findPtid = (req, res) => {
  db2.query(
    'SELECT Lo.id , P.phone , P.address , P.birthDate , P.firstName , P.lastName, P.secondName , Lo.startDate,Lo.endDate, Lo.reason ,Lo.date   from appoinments Lo Join Patients P on Lo.ptId = P.id  where ptId = ' +
      req.body.ptId,
    function (err, result) {
      if (err) {
        res.status(500).send(err.message)
      } else {
        res.send(result)
      }
    }
  )
}
// Find a single Appoinment with an date
exports.findOne = (req, res) => {
  const ID = req.body.id
  console.log('gggggggggggggggggggggggggggg')
  console.log(req)
  Appoinment.findAll({
    where: {
      isDeleted: false,
      date: req.body.date
    }
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving appoinment with id=' + ID
      })
    })
}

// Update a Appoinment by the id in the request
exports.update = (req, res) => {
  console.log(req.body)
  const id = req.body.id

  Appoinment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Appoinment was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update Appoinment with id=${id}. Maybe Appoinment was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating appoinment with id=' + id
      })
    })
}

// Delete a appoinment with the specified id in the request
exports.delete = (req, res) => {
  req.body.isDeleted = true
  exports.update(req, res)
}
function check (req) {
  return new Promise((resolve, reject) => {
    if (req.body.check == 'drId') {
      Dr.findOne({
        where: {
          userId: req.body.id
        }
      }).then(ress => {
        console.log(ress)
        app['drId'] = ress.id
        resolve(ress)
      })
    } else {
      DrFD.findOne({
        where: {
          userId: req.body.id
        }
      }).then(ress => {
        console.log(ress)
        app['drFDId'] = ress.id
        resolve(ress)
      })
    }
  })
}
function getAppointment (req) {
  return new Promise((resolve, reject) => {
    console.log(req.date)
    console.log(req.id)
    if (req.check == 'drFDId') {
      Appoinment.findAll({
        where: {
          isDeleted: false,
          date: req.date,
          drFDId: req.id
        }
      })
        .then(data => {
          console.log('=================================')
          console.log(req.body.date)
          console.log(data)
          resolve(data)
        })
        .catch(err => {
          resolve(err)
        })
    } else {
      // app["drId"]=req.body.id;
      Appoinment.findAll({
        where: {
          isDeleted: false,
          date: req.date,
          drId: req.id
        }
      })
        .then(data => {
          console.log(data)
          resolve(data)
        })
        .catch(err => {
          resolve(err)
        })
    }
  })
}

exports.finddrAppo = (req, res) => {
  console.log('aaa', req.body.drId)
  Dr.findOne({
    where: {
      userId: req.body.drId
    }
  }).then(ress => {
    db2.query(
      'SELECT Lo.id ,P.id as ptId, P.phone , P.address , P.birthDate , P.firstName , P.lastName, P.secondName , Lo.startDate,Lo.endDate, Lo.reason ,Lo.date   from appoinments Lo Join Patients P on Lo.ptId = P.id  where Lo.isDeleted = 0 and drId = ' +
        ress.id,
      function (err, result) {
        if (err) {
          res.status(500).send(err.message)
        } else {
          res.send(result)
          console.log(result)
        }
      }
    )
  })
  /*   console.log(req.body.drId)
    LabOrder.findAll({
        where :{
            isDeleted: false,
            drId : req.body.drId,
            

        }
    }).then(result=>{
        console.log("aaaa")
        console.log(result)
        res.send(result)
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "error in get order by lab id"
        })
    })*/
}
