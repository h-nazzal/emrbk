const multer = require('multer')
const path = require('path')
var router = require('express').Router()
var db = require('../dataBase/dataBaseConnection')
const visistController = require('../controllers/visit.controller')
const fs = require('fs')
var db2 = require('../dataBase/dataBaseConnection')
var pdf = ''
module.exports = app => {
  router.post('/pt_familyHistories', visistController.pt_familyHistories)
  router.post('/onGoingProblem', visistController.findOnGoingProblem)
  router.post('/pt_allergies', visistController.pt_allergies)
  router.post('/pt_interventions', visistController.pt_interventions)
  router.post('/addpt_interventions', visistController.addPt_interventions)
  router.post('/pt_surgery_histories', visistController.pt_surgery_histories)
  router.post('/addVisit', visistController.create)
  router.post('/getPatientVisits', visistController.getPatientVisits)
  router.post(
    '/getUnResolvedDiagnoses',
    visistController.getUnResolvedDiagnoses
  )
  router.post('/getResolvedDiagnoses', visistController.getResolvedDiagnoses)
  router.post('/ResolveDiagnoses', visistController.ResolveDiagnose)

  router.post('/getallPt', visistController.findAllpt)

  router.get('/PrescriptionByDoctor/:Dr_id', function (req, res) {
    db.query(
      `select Pt.firstName , P.id as 'PID',P.notes,P.createdAt,D.name,PD.id as 'PD_id',PD.Quantity,PD.Duration,PD.refailCount from Prescriptions P Join Prescription_Drugs PD on P.id = PD.prescription_id Join drugs D on PD.drug_id = D.id Join visits V on P.visit_id=V.id Join Patients Pt on V.ptid = Pt.id Where V.drid=` +
        req.params.Dr_id,
      function (err, result) {
        if (err) {
          res.status(400)
          res.send(err)
        } else {
          let drugs = groupBy(result, 'PID')

          let prescription = []
          let p_index = 0
          result.map(record => {
            p_index = prescription.findIndex(row => row.id == record.PID)
            if (p_index == -1) {
              prescription.push({
                id: record.PID,
                created_date: record.createdAt,
                notes: record.notes
              })
            }
          })
          res.send({
            drugs: drugs,
            prescriptions: prescription
          })
        }
      }
    )
  })

  function groupBy (list, keyGetter) {
    let temp = list.reduce((r, a) => {
      console.log('a', a)
      console.log('r', r)
      r[a[keyGetter]] = [...(r[a[keyGetter]] || []), a]
      return r
    }, {})
    return temp
  }

  router.get('/previousAppointments/:Pt_id', function (req, res) {
    db.query(
      `select * from appoinments A Join visits V
         on A.id = V.appointment_id Join Prescriptions P on V.id = P.visit_id
          where V.ptId = ${req.params.Pt_id} AND P.result IS NOT NULL`,
      function (err, result) {
        if (err) {
          res.status(400)
          res.send(err)
        } else {
          res.send(result)
        }
      }
    )
  }) // this shows mistake in creating the prescreption using the user id
  // select the PD.id so that it could be used when updating the quantity
  router.get('/PrescriptionByPatient/:Pt_id', function (req, res) {
    db.query(
      `SELECT P.id AS 'PID', P.drId, PD.id AS 'PDID', P.notes, P.createdAt, D.name, PD.Quantity, PD.Duration, PD.refailCount, Y.firstName AS drfirstname, Y.lastName AS drlastname FROM Prescriptions P JOIN Prescription_Drugs PD ON P.id = PD.prescription_id JOIN doctors Y ON P.drId = Y.userId JOIN drugs D ON PD.drug_id = D.id WHERE P.ptId =` +
        req.params.Pt_id,
      function (err, result) {
        if (err) {
          res.status(400)
          res.send(err)
        } else {
          console.log('result : ', result)
          let drugs = groupBy(result, 'PID')
          let prescription = []
          let index = 0
          result.map(record => {
            index = prescription.findIndex(row => row.id == record.PID)
            console.log('record: ', record)
            if (index == -1) {
              prescription.push({
                id: record.PID,
                created_date: record.createdAt,
                notes: record.notes,
                drname: record.drfirstname + ' ' + record.drlastname
              })
            }
          })
          res.send({
            drugs: drugs,
            prescriptions: prescription
          })
        }
      }
    )
  })
  router.post('/addPrescription', function (req, res, next) {
    db.query(
      "Insert Into `Prescriptions`(notes,visit_id,ptId,drId) Values('" +
        req.body.notes +
        "','" +
        req.body.visit_id +
        "','" +
        req.body.ptId +
        "','" +
        req.body.drId +
        "')",
      function (err, result) {
        console.log(
          'creating prescrition',
          "Insert Into `Prescriptions`(notes,visit_id,ptId,drId) Values('" +
            req.body.notes +
            "','" +
            req.body.visit_id +
            "','" +
            req.body.ptId +
            "','" +
            req.body.drId +
            "')"
        )
        if (err) {
          res.status(400)

          res.send(err)
        } else {
          res.send(result)
        }
      }
    )
  })
  router.post('/addsurgerycb', function (req, res) {
    db2.query(
      'SELECT name from surgeries where id =' + req.body.name,

      function (err, result) {
        if (err) {
          console.log(err)
        } else {
          let x = result[0].name
          db2.query(
            'Insert Into pt_surgery_histories (name,notes,ptId) VALUES( "' +
              x +
              '","' +
              req.body.notes +
              '",' +
              req.body.ptId +
              ')',

            console.log(x),

            function (err, result) {
              if (err) {
                console.log(err)
              } else {
                console.log(result)
              }
            }
          )
        }
      }
    )
  })

  router.post('/addPrescription_Drugs_single', function (req, res, next) {
    db.query(
      "Insert Into `Prescription_Drugs`(Quantity,Duration,drug_id,prescription_id,notes,ptId,drId) Values('" +
        req.body.Quantity +
        "','" +
        req.body.Duration +
        "','" +
        req.body.drug_id +
        "','" +
        req.body.PId +
        "','" +
        req.body.notes +
        "','" +
        req.body.ptId +
        "','" +
        req.body.drId +
        "')",
      function (err, result) {
        console.log(
          "Insert Into `Prescription_Drugs`(Quantity,Duration,drug_id,prescription_id,notes,ptId,drId) Values('" +
            req.body.Quantity +
            "','" +
            req.body.Duration +
            "','" +
            req.body.drug_id +
            "','" +
            req.body.PId +
            "','" +
            req.body.notes +
            "','" +
            req.body.ptId +
            "','" +
            req.body.drId +
            "')"
        )
        if (err) {
          res.status(400)
          res.send({ err: err })
        } else {
          res.send(result)
        }
      }
    )
  })

  var result = ''
  router.post(
    '/UpdateResult',
    multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join(__dirname, '../../public/prescriptions'))
        },
        filename: (req, file, cb) => {
          result = Date.now() + '-' + file.originalname
          cb(null, result)
        }
      })
    }).single('result'),
    function (req, res) {
      db.query(
        'select * from `Prescriptions` where id = ' + '"' + req.body.PID + '"',
        function (err, dbresult) {
          if (err) {
            res.send(err)
          } else {
            if (
              fs.existsSync(
                path.join(
                  __dirname,
                  '../../public/prescriptions/' + dbresult[0].result
                )
              )
            ) {
              fs.unlinkSync(
                path.join(
                  __dirname,
                  '../../public/prescriptions/' + dbresult[0].result
                )
              )
            }
            db.query(
              "update `Prescriptions` set result='" +
                result +
                "' where id='" +
                req.body.PID +
                "'",
              function (err, result) {
                if (err) {
                  res.status(400)
                  res.send(err)
                } else {
                  res.send(result)
                }
              }
            )
          }
        }
      )
    }
  )

  router.post('/UpdateCount', function (req, res, next) {
    db.query(
      'select * from`Prescription_Drugs` where id=' + req.body.id,
      function (err, result) {
        if (err) {
          res.status(400)
          res.send({ err: err })
        } else {
          if (
            parseInt(result[0].refailCount) + parseInt(req.body.refailCount) >
            result[0].Quantity
          ) {
            res.status(400)
            res.send({ err: 'refail count is greater than quantity' })
          } else {
            db.query(
              'Update `Prescription_Drugs` set refailCount=' +
                (parseInt(result[0].refailCount) +
                  parseInt(req.body.refailCount)) +
                ' where id=' +
                req.body.id,
              function (err, result) {
                if (err) {
                  res.status(400)
                  res.send({ err: err })
                } else {
                  res.send({ msg: 'Successfully Updated' })
                }
              }
            )
          }
        }
      }
    )
  })

  router.post('/deletePrescription_Drugs', function (req, res, next) {
    console.log(req.body.ids)
    var str = req.body.ids.join("','")
    console.log(str)
    db.query(
      "delete from `Prescription_Drugs` where id In('" + str + "')",
      function (err, result) {
        if (err) {
          res.status(400)
          res.send({ err: err })
        } else {
          res.send(result)
        }
      }
    )
  })

  router.post('/addPrescription_Drugs', function (req, res, next) {
    db.query(
      "Insert Into `Prescriptions`(notes,visit_id) Values('" +
        req.body.notes +
        "','" +
        req.body.visit_id +
        "')",
      function (err, dbresult) {
        if (err) {
          res.status(400)
          console.log('errrrrrrrrorrrr   ', err)
          res.send(err)
        } else {
          console.log(req.body.data)
          req.body.data.forEach((item, index) => {
            console.log(item)
            db.query(
              "Insert Into `Prescription_Drugs`(Quantity,Duration,drug_id,prescription_id) Values('" +
                item.Quantity +
                "','" +
                item.Duration +
                "','" +
                item.drug_id +
                "','" +
                dbresult.insertId +
                "')",
              function (err, result) {
                if (err) {
                  console.log(err)
                } else {
                  console.log('added')
                }
              }
            )
          })
          res.send('Added Successfully')
        }
      }
    )
  })

  router.get('Prescription/:P_id', function (req, res) {
    db.query(
      'SELECT D.name, PD.Quantity,PD.Duration FROM Prescription_Drugs as PD JOIN drugs as D on PD.drug_id = D.id WHERE PD.prescription_id=' +
        req.params.P_id,
      function (err, result) {
        if (err) {
          res.status(400)
          res.send(err)
        } else {
          res.send(result)
        }
      }
    )
  })

  router.get('/mydrugs/:ptId', function (req, res) {
    console.log(req.body)
    db.query(
      'SELECT PD.id, D.name, PD.Quantity,PD.Duration,PD.createdAt,PD.active FROM Prescription_Drugs as PD JOIN drugs as D on PD.drug_id = D.id WHERE ptId = ' +
        req.params.ptId,
      console.log('by:', req.params.ptId, result),
      function (err, result) {
        if (err) {
          res.status(400)
          res.send(err)
        } else {
          res.send(result)
        }
      }
    )
  })
  router.post('/dispense_drug', function (req, res) {
    db.query(
      'Update Prescription_Drugs set active = 1 , refailCount  = refailCount  - ' +
        req.body.value +
        ' where id=' +
        req.body.id,
      function (err, result) {
        if (err) {
          res.status(400)
          res.send(err)
        } else {
          res.send(result)
        }
      }
    )
  })
  router.post('/unactive_drug', function (req, res) {
    db.query(
      'Update Prescription_Drugs set active= 0 where id=' + req.body.id,
      function (err, result) {
        if (err) {
          res.status(400)
          res.send(err)
        } else {
          res.send(result)
        }
      }
    )
  })

  router.post('/myPrescriptions', function (req, res) {
    db.query(
      `SELECT P.id AS 'PID', P.drId, PD.id AS 'PDID', P.notes, P.createdAt, D.name, PD.Quantity, PD.Duration, PD.refailCount, Y.firstName AS drfirstname, Y.lastName AS drlastname FROM Prescriptions P JOIN Prescription_Drugs PD ON P.id = PD.prescription_id JOIN doctors Y ON P.drId = Y.userId JOIN drugs D ON PD.drug_id = D.id WHERE P.ptId =` +
        req.body.ptId,
      function (err, result) {
        if (err) {
          res.status(400)
          res.send(err)
        } else {
          var arr = []
          console.log(result)
          result.map(row => {
            let index = arr.findIndex(r => r.id == row.id)
            console.log(index)
            if (index == -1) {
              arr.push({
                id: row.id,
                PNotes: row.notes,
                PDate: row.createdAt,
                drname: row.drfirstname + ' ' + row.drlastname,
                drugs: [
                  {
                    id: row.PDID,
                    Quantity: row.Quantity,
                    Duration: row.Duration,
                    drug: row.name,
                    notes: row.Notes,
                    refill: row.refailCount
                  }
                ]
              })
            } else {
              arr[index].drugs.push({
                id: row.PDID,
                Quantity: row.Quantity,
                Duration: row.Duration,
                drug: row.drugName,
                notes: row.PDNotes,
                date: row.PDDate
              })
            }
          })
          console.log(arr)
          res.send(arr)
        }
      }
    )
  })

  router.post('/myPrescriptionsByDoctor', function (req, res) {
    db.query(
      `SELECT P.id,P.notes,P.createdAt ,PD.id as PDID ,
        PD.Quantity,PD.Duration,D.name as drugName,PD.notes as PDNotes,PD.createdAt as PDDate
         from Prescriptions P JOIN Prescription_Drugs PD on P.id = PD.prescription_id
          JOIN drugs D on PD.drug_id = D.id where P.drId=` + req.body.drId,
      function (err, result) {
        if (err) {
          console.log(err)
          res.status(400)
          res.send(err)
        } else {
          var arr = []
          console.log(result)
          result.map(row => {
            let index = arr.findIndex(r => r.id == row.id)
            console.log(index)
            if (index == -1) {
              arr.push({
                id: row.id,
                PNotes: row.notes,
                PDate: row.createdAt,
                drugs: [
                  {
                    id: row.PDID,
                    Quantity: row.Quantity,
                    Duration: row.Duration,
                    drug: row.drugName,
                    notes: row.PDNotes,
                    date: row.PDDate
                  }
                ]
              })
            } else {
              arr[index].drugs.push({
                id: row.PDID,
                Quantity: row.Quantity,
                Duration: row.Duration,
                drug: row.drugName,
                notes: row.PDNotes,
                date: row.PDDate
              })
            }
          })
          console.log(arr)
          res.send(arr)
        }
      }
    )
  })

  router.get('DrugsByVisit/:P_id', function (req, res) {
    db.query(
      'SELECT D.name, PD.Quantity,PD.Duration FROM Prescription P JOIN Prescription_Drugs as PD JOIN drugs as D on PD.drug_id = D.id WHERE P.visit_id' +
        req.params.P_id,
      function (err, result) {
        if (err) {
          res.status(400)
          res.send(err)
        } else {
          res.send(result)
        }
      }
    )
  })

  router.post('/addfamilyHistories', function (req, res) {
    db.query(
      'INSERT INTO pt_familyHistories (relation , problem, ptId ) Values ( "' +
        req.body.relation +
        '",' +
        req.body.problem +
        ',"' +
        req.body.ptId +
        ' ")',
      console.log(req.body),
      function (err, ress) {
        if (err) {
          console.log(err)
          console.log(ress)
        } else {
          console.log('added')
        }
      }
    )
    res.send('Added Successfully')
  })

  // router.post('/getSessionById',async function(req,res){
  //     var sql = "SELECT * from `doctor` where id = " + req.body.id ;
  //     db.query(sql, function (err, result) {
  //         if (err) {
  //             res.send(err);
  //         }
  //         else{
  //            res.send(result);
  //         }
  //     });
  //   });
  app.use('/visit', router)
}
