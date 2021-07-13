const db = require('../../model')
var nodemailer = require('nodemailer')

const users = db.users
const role = db.permission
const PT = db.pt
DoctorFD = db.doctorFD
LabFD = db.labFD
RadioFD = db.radioFD
PathoFD = db.pathoFD
Doctor = db.doctor
Nurse = db.nurse
Chemist = db.chemist
Assistant = db.assistant
Radiogist = db.radiogist
Patholigist = db.patholigist
const Op = db.Sequelize.Op
const jwt = require('jsonwebtoken') //Token module
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
var cors = require('cors')
const { radiogist } = require('../../model')

exports.register = (req, res) => {
  var user = {
    tocken: '',
    userName: '',
    hash: '',
    Email: ''
  }
  console.log(req.body)
  // here find if user already exist with this Email or userName
  users
    .findAll({
      where: {
        [Op.or]: [{ Email: req.body.Email }, { userName: req.body.userName }]
      }
    })
    .then(data => {
      if (data.length === 0) {
        // create token
        jwt.sign({ user: user }, 'secretkey', (err, token) => {
          user['tocken'] = token
        })
        //hash the password
        console.log(req.body)
        bcrypt.hash(req.body.Password, 10).then(data => {
          console.log(data)
          user['hash'] = '"' + data + '"'
          user['Email'] = req.body.Email
          user['userName'] = req.body.userName
          // Save user in the database
          users
            .create(user)
            .then(data => {
              res.send({
                message: 'Record has been added successfully'
              })
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message ||
                  'Some error occurred while creating the Tutorial.'
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
        message:
          err.message || 'Some error occurred while retrieving tutorials.'
      })
    })
}
exports.login = (req, res) => {
  var user = {
    role: '',
    userId: '',
    labId: 0,
    pathoId: 0,
    radioId: 0
  }
  users
    .findAll({
      where: {
        userName: req.body.userName
      }
    })
    .then(result => {
      if (result.length === 0) {
        res.send({ message: 'no user with this userName' })
      } else {
        console.log(result[0].id)
        var checkHash = result[0].hash
        checkHash = checkHash.replace(/['"]+/g, '')

        bcrypt.compare(req.body.password, checkHash, function (err1, res1) {
          if (!res1) {
            res.send({ message: 'wrong password' })
          } else {
            console.log()
            role
              .findAll({
                where: {
                  userId: result[0].id
                }
              })
              .then(result2 => {
                console.log('asaaa')
                if (result2.length === 0) {
                  user['userId'] = result[0].id
                  res.send(user)
                  return
                }
                if (result2[0].role == 0) {
                  user['userId'] = result[0].id
                  user['role'] = result2[0].role
                  res.send(user)
                  return
                }
                if (result2[0].role == 3) {
                  LabFD.findOne({
                    where: {
                      userId: result[0].id
                    }
                  })
                    .then(result3 => {
                      user['labId'] = result3.labId
                      console.log('sada', user['labid'])
                      user['role'] = result2[0].role
                      user['userId'] = result[0].id
                      res.send(user)
                    })
                    .catch(err => {
                      res.status(500).send({
                        message: err.message || 'error in get labid'
                      })
                    })
                } else if (result2[0].role == 5) {
                  PathoFD.findOne({
                    where: {
                      userId: result[0].id
                    }
                  })
                    .then(result3 => {
                      user['pathoId'] = result3.pathoId
                      user['role'] = result2[0].role
                      user['userId'] = result[0].id
                      res.send(user)
                    })
                    .catch(err => {
                      res.status(500).send({
                        message: err.message || 'error in get pathoId'
                      })
                    })
                } else if (result2[0].role == 4) {
                  RadioFD.findOne({
                    where: {
                      userId: result[0].id
                    }
                  })
                    .then(result3 => {
                      user['radioId'] = result3.radioId
                      user['role'] = result2[0].role
                      user['userId'] = result[0].id
                      res.send(user)
                    })
                    .catch(err => {
                      res.status(500).send({
                        message: err.message || 'error in get pathoId'
                      })
                    })
                } else {
                  console.log(result2.length + 'asdsad')
                  user['userId'] = result[0].id
                  user['role'] = result2[0].role
                  res.send(user)
                }
              })
              .catch(err => {
                res.status(500).send({
                  message: err.message || 'error in get role'
                })
              })
          }
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'error in get user'
      })
    })
}
exports.findinfo = (req, res) => {
  if (!req.body.userId || !req.body.roleId) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }
  if (req.body.roleId == 1) {
    PT.findOne({
      where: {
        userId: req.body.userId,
        isDeleted: false
      }
    })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'error in get pt info'
        })
      })
  } else if (req.body.roleId == 2) {
    DoctorFD.findOne({
      where: {
        userId: req.body.userId,
        isDeleted: false
      }
    })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'error in get DoctorFD info'
        })
      })
  } else if (req.body.roleId == 3) {
    LabFD.findOne({
      where: {
        userId: req.body.userId,
        isDeleted: false
      }
    })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'error in get LabFD info'
        })
      })
  } else if (req.body.roleId == 4) {
    RadioFD.findOne({
      where: {
        userId: req.body.userId,
        isDeleted: false
      }
    })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'error in get radioFrontDisk info'
        })
      })
  } else if (req.body.roleId == 5) {
    PathoFD.findOne({
      where: {
        userId: req.body.userId,
        isDeleted: false
      }
    })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'error in get PathoFD info'
        })
      })
  } else if (req.body.roleId == 12) {
    Patholigist.findOne({
      where: {
        userId: req.body.userId,
        isDeleted: false
      }
    })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'error in get pathologist info'
        })
      })
  } else if (req.body.roleId == 7) {
    Nurse.findOne({
      where: {
        userId: req.body.userId,
        isDeleted: false
      }
    })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'error in get Nurse info'
        })
      })
  } else if (req.body.roleId == 8) {
    Doctor.findOne({
      where: {
        userId: req.body.userId,
        isDeleted: false
      }
    })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'error in get Doctor info'
        })
      })
  } else if (req.body.roleId == 11) {
    Radiogist.findOne({
      where: {
        userId: req.body.userId,
        isDeleted: false
      }
    })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'error in get Radiogist info'
        })
      })
  } else if (req.body.roleId == 14) {
    Assistant.findOne({
      where: {
        userId: req.body.userId,
        isDeleted: false
      }
    })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'error in get assistant info'
        })
      })
  } else if (req.body.roleId == 16) {
    Chemist.findOne({
      where: {
        userId: req.body.userId,
        isDeleted: false
      }
    })
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || 'error in get chemist info'
        })
      })
  }
}

exports.findptId = (req, res) => {
  PT.findOne({
    where: {
      ptCode: parseInt(req.body.ptCode)
    }
  })
    .then(result => {
      var r = result.id
      console.log(result.id)
      res.send({
        id: r
      })
    })
    .catch(err => {
      res.send({
        message: err.message
      })
    })
}

exports.forgetPass = (req, res) => {
  let userEmail = req.body.email
  users
    .findOne({
      where: {
        Email: req.body.email
      }
    })
    .then(result => {
      console.log(result)
      const id = result.id
      req.body.code = parseInt(Math.random() * (9000 - 1000) + 1000)
      users
        .update(req.body, {
          where: { id: id }
        })
        .then(ress => {
          console.log(ress)
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'alaamenshawy464@gmail.com',
              pass: 'gdvxlutkkejrqcqu'
            }
          })

          var mailOptions = {
            from: 'alaamenshawy464@gmail.com',
            to: userEmail,
            subject: 'Sending Email using Node.js',
            text: req.body.code.toString()
          }

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error)
            } else {
              console.log('Email sent: ' + info.response)
            }
          })
          res.send('update done')
        })
        .catch(err => {
          res.send(err.message)
        })
    })
}

exports.checkCode = (req, res) => {
  users
    .findOne({
      where: {
        Email: req.body.email
      }
    })
    .then(result => {
      if (result.code == req.body.code) {
        res.send({
          message: 'done'
        })
      } else {
        res.send({
          message: 'the code is incoreect'
        })
      }
    })
}

exports.updatePass = (req, res) => {
  users
    .findOne({
      where: {
        Email: req.body.email
      }
    })
    .then(result => {
      bcrypt.hash(req.body.newPassword, 10).then(resss => {
        console.log(resss)
        req.body.hash = resss
        const id = result.id
        users
          .update(req.body, {
            where: { id: id }
          })
          .then(ress => {
            res.send({
              message: 'done'
            })
          })
          .catch(err => {
            res.send(err)
          })
      })
    })
}

exports.findinfoForPt = (req, res) => {
  users
    .findAll({
      where: {
        userName: req.body.userName
      }
    })
    .then(result => {
      if (result.length === 0) {
        res.send('no user with this userName')
      } else {
        console.log(result[0].id)
        var checkHash = result[0].hash
        checkHash = checkHash.replace(/['"]+/g, '')

        bcrypt.compare(req.body.password, checkHash, function (err1, res1) {
          if (!res1) {
            res.send('wrong password')
          } else {
            console.log(res1)
            PT.findOne({
              where: {
                userId: result[0].id
              }
            })
              .then(result2 => {
                res.send(result2)
              })
              .catch(err => {
                res.send(err.message)
              })
          }
        })
      }
    })
    .catch(err => {
      res.send(err.message)
    })
}
