const db = require('../../model')
const crypto = require('crypto')
var db2 = require('../../dataBase/dataBaseConnection')

const Nurse = db.nurse
users = db.users
role = db.permission
NurseModule = db.nurseModule
const Op = db.Sequelize.Op
const jwt = require('jsonwebtoken') //Token module
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
var cors = require('cors')
const { nurseModule, nurse } = require('../../model')
// Create and Save a new nurse
exports.create = (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.secondName ||
    !req.body.phone ||
    !req.body.userName
  ) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }
  var idCode = 'N'
  idCode = idCode + crypto.randomBytes(3).toString('hex')
  const nurse = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    secondName: req.body.secondName,
    drId: req.body.drId,
    phone: parseInt(req.body.phone),
    idCode: idCode,
    userId: ''
  }
  var user = {
    tocken: '',
    userName: '',
    hash: '',
    Email: ''
  }
  var roles = {
    userId: 1,
    role: 7
  }
  users
    .findAll({
      where: {
        [Op.or]: [{ Email: req.body.Email }, { userName: req.body.userName }]
      }
    })
    .then(data => {
      if (data.length === 0) {
        jwt.sign({ user: user }, 'secretkey', (err, token) => {
          user['tocken'] = token
        })
        console.log(user['tocken'])
        //01205119956aa
        bcrypt.hash(req.body.password, 10).then(data => {
          console.log(data)
          user['hash'] = '"' + data + '"'
          user['Email'] = req.body.Email
          user['userName'] = req.body.userName
          // Save user in the database
          users
            .create(user)
            .then(data0 => {
              roles['userId'] = data0.id
              nurse['userId'] = data0.id
              role
                .create(roles)
                .then(date1 => {
                  console.log(roles)
                  console.log(nurse)
                  Nurse.create(nurse)
                    .then(date2 => {
                      res.send({
                        message: 'Record has been added successfully'
                      })
                    })
                    .catch(err => {
                      res.status(500).send({
                        message:
                          err.message + 'asdsa' ||
                          'Some error occurred while creating the nurse.'
                      })
                    })
                })
                .catch(err => {
                  res.status(500).send({
                    message:
                      err.message + '123' ||
                      'Some error occurred while creating the rolus.'
                  })
                })
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || 'Some error occurred while creating the nurse.'
              })
            })
        })
      } else {
        res.status(500).send({
          message: 'userName or Email Already Exist'
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving .'
      })
    })
}

// Retrieve all nurse from the database.
exports.findAll = (req, res) => {
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Nurse.findAll({
    where: {
      isDeleted: false
    }
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving nurses.'
      })
    })
}

// Find a single nurse with an id
exports.findOne = (req, res) => {
  const ID = req.body.id

  Nurse.findAll({
    where: {
      isDeleted: false,
      id: ID
    }
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving nurse with id=' + ID
      })
    })
}

// Update a nurse by the id in the request
exports.update = (req, res) => {
  const id = req.body.id

  Nurse.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'nurse was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update nurse with id=${id}. Maybe nurse was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating nurse with id=' + id
      })
    })
}

// Delete a nurse with the specified id in the request
exports.delete = (req, res) => {
  req.body.isDeleted = true
  exports.update(req, res)
}

//from here we start code for Nurse Module

exports.createNurseModule = (req, res) => {
  console.log(req.body)
  console.log('asd')
  // if (
  //   !req.body.date ||
  //   !req.body.pulse ||
  //   !req.body.bloodPressure ||
  //   !req.body.temperature
  // ) {
  //   res.status(400).send({
  //     message: 'Content can not be empty!'
  //   })
  //   return
  // }

  var model = {
    date: req.body.date,
    time: req.body.time,
    bloodPressure: req.body.bloodPressure,
    pulse: req.body.pulse,
    cigarettes: req.body.cigarettes,
    temperature: req.body.temperature,
    oxygenSaturation: req.body.oxygenSaturation,
    bloodGlucoseLevel: req.body.bloodGlucoseLevel,
    nurseId: parseInt(req.body.nurseId),
    pId: parseInt(req.body.ptId)
  }
  nurseModule
    .create(model)
    .then(result => {
      console.log('woooooooooooooooooooooooo')
      res.send(result)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'error in create nurse module'
      })
    })
}
// get all pt record by date
exports.getByDate = (req, res) => {
  if (!req.body.date) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }
  console.log(req.body.date)
  db2.query(
    'SELECT * from NurseModules n Join nurses s  on n.nurseId = s.id   where n.isDeleted = false  n.date = ' +
      '"' +
      req.body.date +
      '"',
    function (err, result) {
      if (err) {
        res.status(500).send(err.message)
      } else {
        res.send(result)
      }
    }
  )
}
exports.deleteRecorder = (req, res) => {
  const id = req.body.id
  req.body.isDeleted = true
  nurseModule
    .update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'recprder was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update nurse with id=${id}. Maybe nurse was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating nurse with id=' + id
      })
    })
}
// get all pt record by PtId
exports.getByPtId = (req, res) => {
  if (!req.body.ptId) {
    res.status(400).send({
      message: 'req.body.ptId is must required'
    })
    return
  }
  db2.query(
    'SELECT * FROM `NurseModules` WHERE isDeleted = false and `pId` = ' +
      req.body.ptId,
    function (err, result) {
      if (err) {
        res.status(500).send(err.message)
      } else {
        if (!result.length > 0) {
          res.send([])
          return
        }
        var arr = result[0].hasOwnProperty('bloodPressure')
          ? result[0]['bloodPressure'].split('/')
          : ''
        var systolic = arr[0]
        var diastolic = arr[1]
        var resultt = []
        for (var i = 0; i < result.length; i++) {
          resultt.push({
            id: result[i]['id'],
            systolic: systolic,
            diastolic: diastolic,
            pulse: result[i]['pulse'],
            cigarettes: result[i]['cigarettes'],
            temperature: result[i]['temperature'],
            oxygenSaturation: result[i]['oxygenSaturation'],
            bloodGlucoseLevel: result[i]['bloodGlucoseLevel'],
            time: result[i]['time'],
            firstName: result[i]['firstName'],
            date: result[i]['date'],
            lastName: result[i]['lastName'],
            secondName: result[i]['secondName']
          })
        }

        res.send(resultt)
      }
    }
  )
}
