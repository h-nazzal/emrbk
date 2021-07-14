const db = require('../../model')
var db2 = require('../../dataBase/dataBaseConnection')

const pathoOrder = db.pathobOrder
const patholigist = db.patholigist
const PT = db.pt
const pathoFD = db.pathoFD
const DR = db.doctor
const user = db.users
const Op = db.Sequelize.Op
const path = require('path')
const Patho = db.patho

const fs = require('fs')
// Create and Save a new frontDisk
exports.create = (req, res) => {
  if (!req.body.ptId || !req.body.drId || !req.body.comments) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }
  const pathoorder = {
    ptId: parseInt(req.body.ptId),
    drId: 1,
    comments: req.body.comments,
    result: null,
    labFDId: null,
    pathoId: parseInt(req.body.pathoId)
  }
  DR.findOne({
    where: {
      userId: req.body.drId
    }
  })
    .then(ress => {
      pathoorder['drId'] = ress.id
      pathoOrder
        .create(pathoorder)
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
  pathoOrder
    .findOne({
      where: {
        id: req.body.orderId
      }
    })
    .then(data => {
      if (
        fs.existsSync(
          path.join(__dirname, '../../../public/pathelogys/' + data.result)
        )
      ) {
        fs.unlinkSync(
          path.join(__dirname, '../../../public/pathelogys/' + data.result)
        )
      }
      pathoOrder
        .update(
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

      db2.query(
        'SELECT ps.name as pathoName , l.id, d.firstName as OrderingFirstName , d.lastName as OrderinglastName , p.firstName as PtFirstName ,p.lastName as PtlastName, l.comments ,l.status FROM doctors d JOIN pathoOrders l ON l.drId = d.id JOIN Patients p ON l.ptId = p.id JOIN pathos ps on l.pathoId = ps.id where l.isDeleted = false and l.pathoFDId IS NULL and l.ptId = ' +
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
        message: err.message || 'Some error occurred while retrieving Ptcode.'
      })
    })
}

exports.myfindByPtId = (req, res) => {
  db2.query(
    'select PO.*,P.name as pathoName,PFD.address,PFD.phone,PFD.organization from pathoOrders PO JOIN pathos P on PO.pathoId = P.id JOIN pathoFrontDisks PFD on PO.pathoFDId=PFD.id where PO.isDeleted = 0 and PO.ptId=' +
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
    'select D.firstName , D.lastName ,PO.*,P.name as pathoName from pathoOrders PO JOIN pathos P on PO.pathoId = P.id JOIN doctors D on PO.drId = D.id where PO.isDeleted=0 and PO.ptId=' +
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
exports.findBypathoId = (req, res) => {
  console.log('aaa', req.body.labId)
  pathoFD
    .findOne({
      where: {
        userId: req.body.pathoFDId
      }
    })
    .then(ress => {
      if (!ress) {
        patholigist
          .findOne({
            where: {
              userId: req.body.pathoFDId
            }
          })
          .then(ress => {
            db2.query(
              'SELECT y.name, d.firstName as OrderingDrFirstName , d.lastName as tOrderingDrLastName , Lo.Date, Lo.id,Lo.result,Lo.comments,P.id as PtID,P.firstname,P.secondName,P.lastname,P.address,P.phone from pathoOrders Lo Join Patients P on Lo.ptId = P.id Join doctors d on Lo.drId = d.id  Join pathos y on y.id=Lo.pathoId  where Lo.isDeleted = false and  pathoFDId = ' +
                ress.pathoFDId,
              function (err, result) {
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
        'SELECT d.firstName as OrderingDrFirstName , d.lastName as tOrderingDrLastName ,  Lo.id,Lo.result,Lo.comments,P.id as PtID,P.firstname,P.secondName,P.lastname,P.address,P.phone from pathoOrders Lo Join Patients P on Lo.ptId = P.id Join doctors d on Lo.drId = d.id    where Lo.isDeleted = false and  pathoFDId = ' +
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
        message: err.message || 'error in get pathoId'
      })
    })
}

exports.findResultsBypathoId = (req, res) => {
  console.log('aaa', req.body.labId)
  pathoFD
    .findOne({
      where: {
        userId: req.body.pathoFDId
      }
    })
    .then(ress => {
      if (!ress) {
        patholigist
          .findOne({
            where: {
              userId: req.body.pathoFDId
            }
          })
          .then(ress => {
            db2.query(
              'SELECT ps.name as pathoName , d.firstName as OrderingDrFirstName , d.lastName as tOrderingDrLastName ,Lo.Date,  Lo.id,Lo.result,Lo.comments,P.id as PtID,P.firstname,P.secondName,P.lastname,P.address,P.phone from pathoOrders Lo Join Patients P on Lo.ptId = P.id Join doctors d on Lo.drId = d.id  JOIN pathos ps on Lo.pathoId = ps.id  where Lo.result IS NOT NULL and Lo.isDeleted = false and  pathoFDId = ' +
                ress.pathoFDId,
              function (err, result) {
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
        'SELECT ps.name as pathoName , d.firstName as OrderingDrFirstName , d.lastName as tOrderingDrLastName ,  Lo.id,Lo.result,Lo.comments,P.id as PtID,P.firstname,P.secondName,P.lastname,P.address,P.phone from pathoOrders Lo Join Patients P on Lo.ptId = P.id Join doctors d on Lo.drId = d.id  JOIN pathos ps on Lo.pathoId = ps.id  where Lo.result IS NOT NULL and Lo.isDeleted = false and  pathoFDId = ' +
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
        message: err.message || 'error in get pathoId'
      })
    })
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
    labFDId: '',
    userName: ''
  }
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  user
    .findOne({
      where: { id: req.body.ptId }
    })
    .then(data1 => {
      result1['userName'] = data1.userName
      pathoOrder
        .findAll({
          where: {
            labFDId: null,
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
  console.log('aaa', req.body.labId)
  DR.findOne({
    where: {
      userId: req.body.drId
    }
  }).then(ress => {
    db2.query(
      'SELECT ps.name as pathoName ,Lo.createdAt, Lo.id,Lo.result,Lo.comments,P.id as PtID,P.firstname,P.lastname,P.address,P.phone from pathoOrders Lo Join Patients P on Lo.ptId = P.id JOIN pathos ps on Lo.pathoId = ps.id where Lo.isDeleted = false and  Lo.drId = ' +
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
    pathoOrder.findAll({
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
// Find a single order with an id
exports.findOne = (req, res) => {
  const ID = req.body.id

  pathoOrder
    .findAll({
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

// Update a order by the id in the request
exports.update = (req, res) => {
  const id = req.body.id
  pathoFD
    .findOne({
      where: {
        userId: req.body.pathoFDId
      }
    })
    .then(ress => {
      if (!ress) {
        patholigist
          .findOne({
            where: {
              userId: req.body.pathoFDId
            }
          })
          .then(ress => {
            req.body.pathoFDId = ress.pathoFDId

            pathoOrder
              .update(req.body, {
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
      req.body.pathoFDId = ress.id

      pathoOrder
        .update(req.body, {
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

exports.updatepathoId = (req, res) => {
  pathoFD
    .findOne({
      where: {
        id: req.body.pathoFDId
      }
    })
    .then(result => {
      // we save labid not labFdid
      req.body.pathoFId = result.pathoId
      exports.update(req, res)
    })
    .catch(err => {
      res.send(err.message)
    })
}

// Delete a patho order with the specified id in the request
exports.delete = (req, res) => {
  req.body.isDeleted = true
  exports.update(req, res)
}
