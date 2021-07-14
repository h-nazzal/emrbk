const { radioOrder, radioFD } = require('../../model')
const db = require('../../model')
const RadioOrder = db.radioOrder
const DR = db.doctor
const RadioFD = db.radioFD
const radiogist = db.radiogist
const PT = db.pt
var db2 = require('../../dataBase/dataBaseConnection')
const path = require('path')

const fs = require('fs')
const user = db.users
const Op = db.Sequelize.Op
// Create and Save a new frontDisk
exports.create = (req, res) => {
  // if (!req.body.status || !req.body.ptId  || !req.body.drId || !req.body.comments) {
  //     res.status(400).send({
  //         message: "Content can not be empty!"
  //     });
  //     return;
  // }
  const radioOrder = {
    ptId: parseInt(req.body.ptId),
    drId: parseInt(req.body.drId),
    comments: req.body.comments,
    result: null,
    radioFDId: null,
    radioId: parseInt(req.body.radioId)
  }
  DR.findOne({
    where: {
      userId: req.body.drId
    }
  })
    .then(ress => {
      radioOrder['drId'] = ress.id
      RadioOrder.create(radioOrder)
        .then(data => {
          res.send({
            message: 'Record has been added successfully'
          })
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating the order.'
          })
        })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the order.'
      })
    })
}

exports.UploadResult = async (req, res) => {
  RadioOrder.findOne({
    where: {
      id: req.body.orderId
    }
  })
    .then(data => {
      if (
        fs.existsSync(
          path.join(__dirname, '../../../public/radios/' + data.result)
        )
      ) {
        fs.unlinkSync(
          path.join(__dirname, '../../../public/radios/' + data.result)
        )
      }
      RadioOrder.update(
        {
          result: req.resultString
        },
        {
          where: {
            id: data.id
          }
        }
      )
        .then(result => {
          res.send({ pdfPath: req.resultString })
        })
        .catch(err => {
          res.send('error in update')
        })
    })
    .catch(err => {
      console.log(err)
      res.send('erro in find match')
    })
}

exports.findByCode = (req, res) => {
  PT.findOne({
    where: {
      ptCode: req.body.ptCode
    }
  })
    .then(ress => {
      /*where l.isDeleted = false and l.labFDId=null and*/

      console.log(ress.id)
      db2.query(
        'SELECT rs.name as radioName , l.id, d.firstName as OrderingFirstName , d.lastName as OrderinglastName , p.firstName as PtFirstName ,p.lastName as PtlastName,p.phone, l.comments ,l.status FROM doctors d JOIN radioOrders l ON l.drId = d.id JOIN Patients p ON l.ptId = p.id JOIN radios rs on l.radioId = rs.id where l.isDeleted = false and l.radioFDId IS NULL and  ptId = ' +
          ress.id,
        function (err, result) {
          if (err) {
            res.status(500).send(err.message)
          } else {
            res.send(result)
          }
        }
      )

      /*
        console.log(result.id)
        LabOrder.findAll({
            where: { 
                ptId: result.id,
                result:null,
                isDeleted:false,
                labFDId:null,
            }
        }).then(data=>{
            res.send(data)
        }).catch(err=>{
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving order."
            });
        })*/
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Ptcode.'
      })
    })
}

exports.myfindByPtId = (req, res) => {
  db2.query(
    'select RO.*,R.name as radioName,RFD.address,RFD.phone,RFD.organization from radioOrders RO JOIN radios R on RO.radioId = R.id JOIN radioFrontDisks RFD on RO.radioFDId=RFD.id where RO.isDeleted = 0 and RO.ptId=' +
      req.body.ptId,
    function (err, result) {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    }
  )
}

exports.findByPtId = (req, res) => {
  db2.query(
    'select D.firstName , D.lastName ,RO.*,R.name as radioName from radioOrders RO JOIN radios R on RO.radioId = R.id JOIN doctors D on RO.drId = D.id where RO.isDeleted=0 and RO.ptId=' +
      req.body.ptId,
    function (err, result) {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    }
  )
}
// Retrieve all order not acceoted from the database.
exports.findAll = (req, res) => {
  const result1 = {
    status: '',
    ptId: '',
    Date: '',
    drId: '',
    comments: '',
    result: '',
    radioFDId: '',
    userName: ''
  }
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  user
    .findOne({
      where: { id: req.body.ptId }
    })
    .then(data1 => {
      result1['userName'] = data1.userName
      RadioOrder.findAll({
        where: {
          radioFDId: null,
          isDeleted: false
        }
      })
        .then(data => {
          console.log(data[0].status)
          result1['status'] = data[0].status
          result1['comments'] = data[0].comments
          result1['result'] = data[0].result
          result1['Date'] = data[0].Date
          res.send(result1)
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message ||
              'Some error occurred while retrieving patho orders.'
          })
        })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving order.'
      })
    })
}

exports.findByDrId = (req, res) => {
  DR.findOne({
    where: {
      userId: req.body.drId
    }
  }).then(ress => {
    db2.query(
      'SELECT rs.name as radioName ,Lo.createdAt, Lo.id,Lo.result,Lo.comments,P.id as PtID,P.firstname,P.lastname,P.address,P.phone from radioOrders Lo Join Patients P on Lo.ptId = P.id JOIN radios rs on Lo.radioId = rs.id where Lo.isDeleted = false and  Lo.drId = ' +
        ress.id,
      function (err, result) {
        if (err) {
          res.status(500).send(err.message)
        } else {
          res.send(result)
        }
      }
    )
  })
  /*
    RadioOrder.findAll({
        where :{
            isDeleted: false,
            drId : req.body.drId,
        }
    }).then(result=>{
        console.log(result)
        res.send(result)
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "error in get order by lab id"
        })
    })*/
}
exports.findByradioId = (req, res) => {
  radioFD
    .findOne({
      where: { userId: req.body.radioFDId }
    })
    .then(ress => {
      if (!ress) {
        radiogist
          .findOne({
            where: { userId: req.body.radioFDId }
          })
          .then(ress => {
            db2.query(
              'SELECT d.firstName as  OrderingDrFirstName , y.name as radioName , d.lastName as tOrderingDrLastName ,  Lo.id,Lo.Date,Lo.result,Lo.comments,P.id as PtID,P.phone,P.firstname,P.secondName,P.lastname,P.address,P.phone from radioOrders Lo Join Patients P on Lo.ptId = P.id Join radios y on Lo.radioId = y.id Join doctors d on Lo.drId = d.id    where Lo.isDeleted = false and  radioFDId = ' +
                ress.radioFDId,
              function (err, result) {
                console.log(err)
                if (err) {
                  res.status(500).send(err.message)
                } else {
                  res.send(result)
                }
              }
            )
          })
        return
      }
      db2.query(
        'SELECT d.firstName as OrderingDrFirstName , d.lastName as tOrderingDrLastName ,  Lo.id,Lo.result,Lo.comments,P.id as PtID,P.phone,P.firstname,P.secondName,P.lastname,P.address,P.phone from radioOrders Lo Join Patients P on Lo.ptId = P.id Join doctors d on Lo.drId = d.id    where Lo.isDeleted = false and  radioFDId = ' +
          ress.id,
        function (err, result) {
          if (err) {
            res.status(500).send(err.message)
          } else {
            res.send(result)
          }
        }
      )
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'error in get radioId'
      })
    })
}

exports.findResultsByradioId = (req, res) => {
  radioFD
    .findOne({
      where: { userId: req.body.radioFDId }
    })
    .then(ress => {
      if (!ress) {
        radiogist
          .findOne({
            where: { userId: req.body.radioFDId }
          })
          .then(ress => {
            db2.query(
              'SELECT rs.name as radioName ,Lo.Date as date, d.firstName as OrderingDrFirstName , d.lastName as tOrderingDrLastName ,  Lo.id,Lo.result,Lo.comments,P.id as PtID,P.phone,P.firstname,P.secondName,P.lastname,P.address,P.phone from radioOrders Lo Join Patients P on Lo.ptId = P.id Join doctors d on Lo.drId = d.id  JOIN radios rs on Lo.radioId = rs.id  where Lo.result IS NOT NULL and Lo.isDeleted = false and  radioFDId = ' +
                ress.radioFDId,
              function (err, result) {
                console.log(err)
                if (err) {
                  res.status(500).send(err.message)
                } else {
                  res.send(result)
                }
              }
            )
          })

        return
      }
      db2.query(
        'SELECT rs.name as radioName , d.firstName as OrderingDrFirstName , d.lastName as tOrderingDrLastName ,  Lo.id,Lo.result,Lo.comments,P.id as PtID,P.phone,P.firstname,P.secondName,P.lastname,P.address,P.phone from radioOrders Lo Join Patients P on Lo.ptId = P.id Join doctors d on Lo.drId = d.id  JOIN radios rs on Lo.radioId = rs.id  where Lo.result IS NOT NULL and Lo.isDeleted = false and  radioFDId = ' +
          ress.id,
        function (err, result) {
          if (err) {
            res.status(500).send(err.message)
          } else {
            res.send(result)
          }
        }
      )
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'error in get radioId'
      })
    })
}

// Find a single order with an id
exports.findOne = (req, res) => {
  const ID = req.body.id

  RadioOrder.findAll({
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
        message: 'Error retrieving patho order with id=' + ID
      })
    })
}
exports.updateradioId = (req, res) => {
  RadioFD.findOne({
    where: {
      id: req.body.radioFDId
    }
  })
    .then(result => {
      // we save labid not labFdid
      req.body.radioFDId = result.radioId
      exports.update(req, res)
    })
    .catch(err => {
      res.send(err.message)
    })
}

// Update a order by the id in the request
exports.update = (req, res) => {
  radioFD
    .findOne({
      where: {
        userId: req.body.radioFDId
      }
    })
    .then(ress => {
      if (!ress) {
        radiogist
          .findOne({
            where: {
              userId: req.body.radioFDId
            }
          })
          .then(ress => {
            req.body.radioFDId = ress.radioFDId

            const id = req.body.id

            RadioOrder.update(req.body, {
              where: { id: id }
            })
              .then(num => {
                if (num == 1) {
                  res.send({
                    message: 'order was updated successfully.'
                  })
                } else {
                  res.send({
                    message: `Cannot update order with id=${id}. Maybe order was not found or req.body is empty!`
                  })
                }
              })
              .catch(err => {
                res.status(500).send({
                  message: 'Error updating patho order with id=' + id
                })
              })
          })
        return
      }
      req.body.radioFDId = ress.id

      const id = req.body.id

      RadioOrder.update(req.body, {
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: 'order was updated successfully.'
            })
          } else {
            res.send({
              message: `Cannot update order with id=${id}. Maybe order was not found or req.body is empty!`
            })
          }
        })
        .catch(err => {
          res.status(500).send({
            message: 'Error updating patho order with id=' + id
          })
        })
    })
}

// Delete a patho order with the specified id in the request
exports.delete = (req, res) => {
  req.body.isDeleted = true
  exports.update(req, res)
}
