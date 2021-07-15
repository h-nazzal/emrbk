const path = require('path')
const fs = require('fs')
const modifyFunction = require('./requestForOrder')

// connect to database
const db = require('../model')
const Doctor = db.doctor
const Visit = db.visit
const LabOrder = db.labOrder
const pathoOrder = db.pathobOrder
const LabFD = db.labFD
const Op = db.Sequelize.Op
var db2 = require('../dataBase/dataBaseConnection')

const addOrderSurgry = order => {
  return new Promise((resolve, reject) => {
    db2.query(
      "Insert Into `pt_surgery_histories`(notes,surgy_id,ptId) VALUES('" +
        order.notes +
        "','" +
        order.id +
        "','" +
        order.ptId +
        "')",
      function (err, result) {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      }
    )
  })
}

exports.getPatientVisits = (req, res) => {
  let query =
    req.body.type === 'doctor'
      ? `select V.*,P.firstNam,P.lastName 
         from visits V JOIN doctors D on V.drId = D.id
          JOIN users U on U.id = D.userId Join Patients P on V.ptId = P.id
            where U.id=${req.body.drId}`
      : `select V.*,D.firstName,D.lastName
             from visits V JOIN doctors D on V.drId = D.id
              where ptId=${req.body.ptId}`
  console.log(query)
  db2.query(query, function (err, result) {
    if (err) {
      console.log(err)
      res.status(400).send(err)
    } else {
      console.log(result)
      res.send(result)
    }
  })
}

exports.getUnResolvedDiagnoses = (req, res) => {
  let query =
    req.body.type === 'doctor'
      ? `select V.*,P.firstNam,P.lastName 
     from visits V JOIN doctors D on V.drId = D.id
      JOIN users U on U.id = D.userId Join Patients P on V.ptId = P.id
        where U.id=${req.body.drId} and V.diagnoseResolved = 0`
      : `select V.*,D.firstName,D.lastName
         from visits V JOIN doctors D on V.drId = D.id
          where V.ptId=${req.body.ptId} and V.diagnoseResolved = 0`
  console.log(query)
  db2.query(query, function (err, result) {
    if (err) {
      console.log(err)
      res.status(400).send(err)
    } else {
      console.log(result)
      res.send(result)
    }
  })
}

exports.ResolveDiagnose = (req, res) => {
  let query = `update visits Set diagnoseResolved=1 where id=${req.body.id}`
  db2.query(query, function (err, result) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.send(result)
    }
  })
}

exports.getResolvedDiagnoses = (req, res) => {
  let query =
    req.body.type === 'doctor'
      ? `select V.*,P.firstNam,P.lastName 
     from visits V JOIN doctors D on V.drId = D.id
      JOIN users U on U.id = D.userId Join Patients P on V.ptId = P.id
        where U.id=${req.body.drId} and V.diagnoseResolved = 1`
      : `select V.*,D.firstName,D.lastName
         from visits V JOIN doctors D on V.drId = D.id
          where V.ptId=${req.body.ptId} and V.diagnoseResolved = 1`
  console.log(query)
  db2.query(query, function (err, result) {
    if (err) {
      console.log(err)
      res.status(400).send(err)
    } else {
      console.log(result)
      res.send(result)
    }
  })
}

exports.create = (req, res) => {
  console.log('ptid:  ', req.body)
  var modify = new modifyFunction()
  let table = `radioOrders`
  let table1 = `labOrders`
  let table2 = `pathoOrders`
  var result = JSON.stringify(req.body)
  var json = JSON.parse(result)
  let dease = ''

  for (var i = 0; i < json.DD.length; i++) {
    if (i == 0) {
      dease += '{'
    }
    dease += json.DD[i].id + ','
  }
  dease += '}'
  let test = true
  for (var i = 0; i < json.labsChoices.length; i++) {
    modify.addOrder(json.labsChoices[i]).then(result => {
      if (result) {
        console.log(result)
        test = true
      } else {
        res.send('error in add order')
        test = false
      }
    })
    if (!test) {
      break
    }
  }
  for (var i = 0; i < json.radioChoices.length; i++) {
    modify.addOrder2(json.radioChoices[i], table).then(result => {
      if (result) {
        console.log(result)
        test = true
      } else {
        res.send('error in add  radio ')
      }
    })
  }
  for (var i = 0; i < json.pathologyChoices.length; i++) {
    modify.addOrder3(json.pathologyChoices[i], table2).then(result => {
      if (result) {
        console.log(result)
        test = true
      } else {
        res.send('error in add pathology')
      }
    })
  }

  for (var i = 0; i < json.surgeries.length; i++) {
    addOrderSurgry(json.surgeries[i])
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        console.log(err)
        return
      })
  }

  var visit = {
    chiefComplains: json.chiefComplains,
    interventions: json.interventions,
    diagnosis: json.diagnosis,
    surgeries: JSON.stringify(json.surgeries),
    deasesId: dease,
    surgeryDate: json.surgeryDate,
    interventionDate: json.interventionDate,
    ptId: parseInt(req.body.ptId),
    drId: 1
  }
  Doctor.findOne({
    where: {
      userId: req.body.drId
    }
  }).then(ress => {
    visit['drId'] = parseInt(ress.id)
    Visit.create(visit)
      .then(result => {
        res.send(result)
      })
      .catch(err => {
        res.send({
          message: err.message
        })
      })
  })

  //#region
  /*var result = JSON.stringify(req.body);
    var json = JSON.parse(result);
    let dease = "";
            
    for (var i = 0; i < json.DD.length; i++) {
        if (i == 0) {
            dease += '{'
        }
        dease += (json.DD[i].id) + ',';
    }
    dease += '}'
    let test = true;
    for (var i = 0; i < json.labsChoices.length; i++) {
        const laborder = {
            status: json.labsChoices[i].status,
            ptId: parseInt(json.labsChoices[i].ptId),
            Date: json.labsChoices[i].Date,
            drId: parseInt(json.labsChoices[i].drId),
            comments:json.labsChoices[i].comments,
            result: null,
            labFDId: null,
        };
        LabOrder.create(laborder)
            .then(data => {
                res.send({
                    message : "Record has been added successfully"
                });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the order."
                });
            });
    
    }
    for (var i = 0; i < json.pathologyChoices.length; i++) {
        const pathoorder = {
            status: req.body.status,
            ptId: parseInt(req.body.ptId),
            Date: req.body.Date,
            drId: parseInt(req.body.drId),
            comments: req.body.comments,
            result: null,
            labFDId: null,
        };
        pathoOrder.create(pathoorder)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the order."
                });
            });
    
    }
    const visit = {
        chiefComplains: json.chiefComplains,
        diagnosis: json.diagnosis,
        interventions: json.interventions,
        surgeries: json.surgeries,
        deasesId: dease,
        surgeryDate: json.surgeryDate,
        interventionDate: json.interventionDate,
        ptId: parseInt(req.body.ptId),
        drId: parseInt(req.body.drId),
    }
    Visit.create(visit).then(result1=>{
        res.send(result1)
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "error in add visit"
        })
    })*/
  //#endregion
}

// get all pt related to the doctor
exports.findAllpt = (req, res) => {
  // db.query("SELECT Lo.id,Lo.result,P.id as PtID,P.firstname,P.secondName,P.lastname,P.address,P.phone from labOrder Lo Join Patient P on Lo.ptId = P.id  where labId = "+labId,function(err,result){
  Doctor.findOne({
    where: {
      userId: req.body.drId
    }
  })
    .then(rees => {
      console.log(rees.id)
      if (rees == null) {
        res.send({
          message: 'there is no dr With this id'
        })
      } else {
        db2.query(
          'SELECT pt.* from Patients pt Join visits v  on pt.id = v.ptid   where v.drId = ' +
            rees.id +
            ' GROUP BY pt.id',
          function (err, result) {
            if (err) {
              res.status(500).send(err.message)
            } else {
              res.send(result)
            }
          }
        )
      }
    })
    .catch(err => {
      res.send(err.message)
    })
}
exports.findOnGoingProblem = (req, res) => {
  db2.query(
    'SELECT * from Patients pt Join pt_problems v  on pt.id = v.ptid   where pt.id = ' +
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
exports.pt_surgery_histories = (req, res) => {
  db2.query(
    'SELECT * from Patients pt Join pt_surgery_histories v  on pt.id = v.ptid   where pt.id = ' +
      req.body.ptId,
    function (err, result) {
      if (err) {
        res.status(500).send(err.message)
      } else {
        res.send(result)
        console.log(result)
      }
    }
  )
}
exports.pt_interventions = (req, res) => {
  db2.query(
    'SELECT * from Patients pt Join pt_interventions v  on pt.id = v.ptid   where pt.id = ' +
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
exports.pt_allergies = (req, res) => {
  db2.query(
    'SELECT * from Patients pt Join pt_allergies v  on pt.id = v.ptid   where pt.id = ' +
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
exports.pt_familyHistories = (req, res) => {
  db2.query(
    'SELECT * from pt_familyHistories FM Join diseases D on D.id= FM.problem where FM.ptId=' +
      req.body.ptId,
    function (err, result) {
      if (err) {
        res.status(500).send(err.message),
          console.log(
            'SELECT * FROM Patients pt JOIN pt_familyHistories v ON pt.id = v.ptId JOIN diseases t ON v.problem= t.id WHERE pt.id ="' +
              req.body.ptId +
              '"'
          ),
          console.log('reason:', err.message)
      } else {
        res.send(result)
      }
    }
  )
}
