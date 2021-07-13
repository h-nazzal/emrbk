const db = require('../../model')
var db2 = require('../../dataBase/dataBaseConnection')
const LabOrder = db.labOrder
const LabFD = db.labFD
const DR = db.doctor
const PT = db.pt
const Op = db.Sequelize.Op
const path = require('path')

// Create and Save a new order
const fs = require('fs')
const { rejects } = require('assert')
const { resolve } = require('path')

exports.UploadResult = async (req, res) => {
  LabOrder.findOne({
    where: {
      id: req.body.orderId
    }
  })
    .then(data => {
      if (
        fs.existsSync(
          path.join(__dirname, '../../../public/labs/' + data.result)
        )
      ) {
        fs.unlinkSync(
          path.join(__dirname, '../../../public/labs/' + data.result)
        )
      }
      LabOrder.update(
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

exports.create = (req, res) => {
  if (!req.body.ptId || !req.body.drId || !req.body.comments) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }

  const laborder = {
    ptId: parseInt(req.body.ptId),
    Date: null,
    drId: parseInt(req.body.drId),
    comments: req.body.comments,
    result: null,
    labFDId: null,
    labId: parseInt(req.body.labId)
  }
  DR.findOne({
    where: {
      userId: req.body.drId
    }
  })
    .then(ress => {
      console.log('ress')
      console.log(ress)
      console.log(ress.id)
      laborder['drId'] = ress.id
      LabOrder.create(laborder)
        .then(data => {
          res.send({
            message: 'Record has been added successfully'
          })
        })
        .catch(err => {
          console.log(err)
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating the order.'
          })
        })
    })
    .catch(err => {
      console.log(err)

      res.status(500).send({
        message: err.message || 'Some error occurred while creating the order.'
      })
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
        'SELECT l.id ,ls.name as labName, d.firstName as OrderingFirstName , d.lastName as OrderinglastName , p.firstName as PtFirstName ,p.lastName as PtlastName,p.phone, l.comments ,l.status FROM doctors d JOIN labOrders l ON l.drId = d.id JOIN Patients p ON l.ptId = p.id JOIN labs ls on l.labId = ls.id where l.isDeleted = false and l.labFDId IS NULL and  ptId = ' +
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
    'select LO.*,L.name as labName,LFD.address,LFD.phone,LFD.organization from labOrders LO JOIN labs L on LO.labId = L.id JOIN labFrontDisks LFD on LO.labFDId = LFD.id where LO.isDeleted = 0 and LO.ptId=' +
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
//getBy ptId
exports.findByPtId = (req, res) => {
  console.log('voooollaaaaaa')
  db2.query(
    'select D.firstName , D.lastName , LO.*,L.name as labName from labOrders LO JOIN labs L on LO.labId = L.id JOIN doctors D on LO.drId = D.id where LO.isDeleted=0 and LO.ptId=' +
      req.body.ptId,
    function (err, result) {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
        console.log(result)
        console.log(
          'select D.firstName , D.lastName , LO.*,L.name as labName from labOrders LO JOIN labs L on LO.labId = L.id JOIN doctors D on LO.drId = D.id where LO.isDeleted=0 and LO.ptId=' +
            req.body.ptId
        )
      }
    }
  )
}
// Retrieve all order not acceoted from the database.
exports.findAll = (req, res) => {
  db2.query(
    'select LO.*,L.name as labName from labOrders LO JOIN labs L on LO.labId = L.id where LO.isDeleted=0 and labFDId IS NULL',
    function (err, result) {
      if (err) {
        res.status(400).send(err)
      } else {
        res.send(result)
      }
    }
  )
}
//find order by labid
exports.findBylabId = (req, res) => {
  console.log('aaa', req.body.labFDId)
  LabFD.findOne({
    where: {
      userId: req.body.labFDId
    }
  })
    .then(ress => {
      db2.query(
        'SELECT d.firstName as OrderingDrFirstName , d.lastName as tOrderingDrLastName ,  Lo.id,Lo.result,Lo.comments,P.id as PtID,P.phone,P.firstname,P.secondName,P.lastname,P.address,P.phone from labOrders Lo Join Patients P on Lo.ptId = P.id Join doctors d on Lo.drId = d.id where Lo.isDeleted = false and  Lo.labFDId = ' +
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
        message: err.message || 'error in get labId'
      })
    })
}
exports.findResultsBylabId = (req, res) => {
  console.log('aaa', req.body.labFDId)
  LabFD.findOne({
    where: {
      userId: req.body.labFDId
    }
  })
    .then(ress => {
      db2.query(
        'SELECT L.name as labName , d.firstName as OrderingDrFirstName , d.lastName as tOrderingDrLastName ,  Lo.id,Lo.result,Lo.comments,P.id as PtID,P.phone,P.firstname,P.secondName,P.lastname,P.address,P.phone from labOrders Lo Join Patients P on Lo.ptId = P.id Join doctors d on Lo.drId = d.id JOIN labs L on Lo.labId = L.id where Lo.result IS NOT NULL and Lo.isDeleted = false and  Lo.labFDId = ' +
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
        message: err.message || 'error in get labId'
      })
    })
}

exports.findByDrId = (req, res) => {
  console.log('aaa', req.body.drId)
  DR.findOne({
    where: {
      userId: req.body.drId
    }
  }).then(ress => {
    db2.query(
      'SELECT L.name as labName,Lo.createdAt,Lo.id,Lo.result,Lo.comments,P.id as PtID,P.firstname,P.lastname,P.address,P.phone from labOrders Lo Join Patients P on Lo.ptId = P.id JOIN labs L on Lo.labId = L.id where Lo.isDeleted = false and  Lo.drId = ' +
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
// Find a single order with an id
exports.findOne = (req, res) => {
  const ID = req.body.id

  LabOrder.findAll({
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
        message: 'Error retrieving lab order with id=' + ID
      })
    })
}

// Update a order by the id in the request
exports.update = (req, res) => {
  LabFD.findOne({
    where: {
      userId: req.body.labFDId
    }
  }).then(ress => {
    req.body.labFDId = ress.id

    const ID = req.body.id
    var dt2 = new Date()
    dt2 = dt2
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')
    req.body.Date = dt2
    LabOrder.update(
      {
        labFDId: req.body.labFDId
      },
      {
        where: { id: ID }
      }
    )
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
          message: 'Error updating lab order with id=' + id
        })
      })
  })
}

// Delete a lab order with the specified id in the request
exports.delete = (req, res) => {
  req.body.isDeleted = true
  exports.update(req, res)
}
exports.updateLabId = (req, res) => {
  exports.update(req, res)
}
function getPt (ID) {
  PT.findOne({
    where: {
      id: ID
    }
  })
    .then(result => {
      return result
    })
    .catch(err => {
      return err.message
    })
}
