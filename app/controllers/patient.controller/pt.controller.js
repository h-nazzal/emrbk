const db = require('../../model')
const PT = db.pt
const History = db.ptProblem
const Allergy = db.ptAllergy
const Surgey = db.ptSurgery
const Family = db.familyHistory
const Invest = db.inverven
const USER = db.users
const Op = db.Sequelize.Op
var db2 = require('../../dataBase/dataBaseConnection')

exports.create = (req, res) => {
  var result = JSON.stringify(req.body)
  var json = JSON.parse(result)
  db2.query(
    'select * from `users` where userName = ' + '"' + json.userName + '"',
    function (errr, resu) {
      if (errr) {
        console.log('errrrrrrrroororoororo', errr)
        res.send('error')
      } else {
        //add gender
        console.log('In elseeeeeee')
        console.log(resu[0]['id'])
        var userId = resu[0]['id']
        ptCode = Math.floor(Math.random() * parseInt(resu[0]['id']) * 1000)
        console.log('ressssssssss', resu[0]['id'])

        db2.query(
          'INSERT INTO ' +
            '`Patients`' +
            '(ptCode,phone,address,birthDate,maritalStatus,bloodGroup,firstName,lastName,secondName,gender,userId) VALUES(' +
            ptCode +
            ',"' +
            json.phone +
            '"' +
            ',' +
            '"' +
            json.address +
            '"' +
            ',' +
            '"' +
            json.birthDate +
            '"' +
            ',' +
            '"' +
            json.status +
            '"' +
            ',' +
            '"' +
            json.BloodGroup +
            '"' +
            ',' +
            '"' +
            json.firstName +
            '"' +
            ',' +
            '"' +
            json.lastName +
            '" ,' +
            '"' +
            json.secondName +
            '" , "' +
            json.gender +
            '" ,' +
            parseInt(userId) +
            ');',
          function (err, result) {
            if (err) {
              console.log('err=>>' + err)
              res.send(err)
            } else {
              console.log(result)
              for (var i = 0; i < json.Allergy.length; i++) {
                db2.query(
                  'INSERT INTO ' +
                    '`pt_allergies`' +
                    '(type,name,status,date,ptid) VALUES(' +
                    '"' +
                    json.Allergy[i].type +
                    '"' +
                    ',' +
                    '"' +
                    json.Allergy[i].name +
                    '"' +
                    ',' +
                    '"' +
                    json.Allergy[i].status +
                    '", "' +
                    json.Allergy[i].date +
                    '",' +
                    result['insertId'] +
                    ');',
                  function (err, result2) {
                    if (err) {
                      console.log(err)
                      res.send(err)
                    }
                  }
                )
              }

              for (var i = 0; i < json.familyHistory.length; i++) {
                db2.query(
                  'INSERT INTO ' +
                    '`pt_familyHistories`' +
                    '(relation,problem,notes,ptid) VALUES(' +
                    '"' +
                    json.familyHistory[i].relation +
                    '"' +
                    ',' +
                    '"' +
                    json.familyHistory[i].problem +
                    '"' +
                    ',' +
                    '"' +
                    'json.familyHistory[i].note' +
                    '",' +
                    result['insertId'] +
                    ');',
                  function (err, result2) {
                    if (err) {
                      console.log(err)
                      res.send(err)
                    }
                  }
                )
              }
              for (var i = 0; i < json.surgeries.length; i++) {
                db2.query(
                  'INSERT INTO ' +
                    '`pt_surgery_histories`' +
                    '(name,date,notes,ptid) VALUES(' +
                    '"' +
                    json.surgeries[i].name +
                    '"' +
                    ',' +
                    '"' +
                    json.surgeries[i].date +
                    '",' +
                    '"' +
                    json.surgeries[i].note +
                    '",' +
                    result['insertId'] +
                    ');',
                  function (err, result3) {
                    if (err) {
                      console.log(err)
                      res.send(err)
                    }
                  }
                )
              }
              for (var i = 0; i < json.onGoingProblems.length; i++) {
                db2.query(
                  'INSERT INTO ' +
                    '`pt_problems`' +
                    '(problem,date,ptid) VALUES(' +
                    '"' +
                    json.onGoingProblems[i].problem +
                    '"' +
                    ',' +
                    '"' +
                    json.onGoingProblems[i].date +
                    '"' +
                    ',' +
                    result['insertId'] +
                    ');',
                  function (err, result3) {
                    if (err) {
                      console.log(err)
                      res.send(err)
                    }
                  }
                )
              }
              for (var i = 0; i < json.Interventions.length; i++) {
                db2.query(
                  'INSERT INTO ' +
                    '`pt_interventions`' +
                    '(name,notes,ptid) VALUES(' +
                    '"' +
                    json.Interventions[i].name +
                    '",' +
                    '"' +
                    json.Interventions[i].note +
                    '",' +
                    result['insertId'] +
                    ');',
                  function (err, result3) {
                    if (err) {
                      console.log(err)
                      res.send(err)
                    }
                  }
                )
              }
              res.send('done')
            }
          }
        )
      }
    }
  )

  /*
    if (!req.body || !req.body.firstName || !req.body.lastName || !req.body.secondName) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    var result = JSON.stringify(req.body);
    var json = JSON.parse(result);
    //var ptCode =  Math.floor(Math.random() * 1000)

    var Alergy = {
        type: "",
        reaction: "",
        notes: "",
        ptId: "",

    }
    var inv ={
        name: "",
        notes: "",
        date: "",
        ptId: "",
    }
    var family = {
        relation: "",
        problem: "",
        date: "",
        notes: "",
        ptId: "",
    }
    var problems = {
        treatingDr: "",
        problem: "",
        date: "",
        status: "",
        ptId: "",

    }
    var surgy = {
        name: "",
        notes: "",
        date: "",
        ptId: "",

    }
    var user = {
        tocken: "",
        userName: "",
        hash: "",
        Email: ""
    }
    var pt = {
        phone: parseInt(req.body.phone),
        address: req.body.address,
        birthDate: req.body.birthDate,
        maritalStatus: req.body.maritalStatus,
        bloodGroup: req.body.bloodGroup,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        secondName: req.body.secondName,
        userId: "",
        ptCode:'',
    }
    USER.findAll({
        where: {
                Email: req.body.Email ,
            
        }

    })
        .then(data => {
            if (data.length === 0) {
                jwt.sign({ user: user }, 'secretkey', (err, token) => {
                    user["tocken"] = token;
                });
                console.log(user["tocken"])
                //01205119956aa
                bcrypt.hash(req.body.Password, 10).then(data => {
                    console.log(data)
                    user["hash"] = '"' + data + '"'
                    user["Email"] = req.body.Email;
                    user["userName"] = req.body.userName
                    // Save user in the database
                    USER.create(user)
                        .then(data0 => {
                            pt["userId"] = data0.id;
                            pt["ptCode"] =  Math.floor(Math.random() * parseInt(data0.id) * 1000 );
                            PT.create(pt).then(date1 => {
                                //add Alergy 
                                for (var i = 0; i < json.Allergy.length; i++) {
                                    Alergy["notes"] = json.Allergy[i].notes;
                                    Alergy["reaction"] = json.Allergy[i].reaction;
                                    Alergy["type"] = json.Allergy[i].type;
                                    Alergy["ptId"] = date1.id;
                                    Allergy.create(Alergy).catch(err => {
                                        res.status(500).send({
                                            message:
                                                err.message + "123" || "Some error occurred while creating the Allergy."
                                        })
                                    })

                                }
                                for (var i = 0; i < json.surgeries.length; i++) {
                                    surgy["date"] = json.surgeries[i].date;
                                    surgy["name"] = json.surgeries[i].name;
                                    surgy["notes"] = json.surgeries[i].notes;
                                    surgy["ptId"] = date1.id;
                                    Surgey.create(surgy).catch(err => {
                                        res.status(500).send({
                                            message:
                                                err.message + "123" || "Some error occurred while creating the surgy."
                                        })
                                    })

                                }
                                for (var i = 0; i < json.Interventions.length; i++) {
                                    inv["date"] = json.Interventions[i].date;
                                    inv["name"] = json.Interventions[i].name;
                                    inv["notes"] = json.Interventions[i].notes;
                                    inv["ptId"] = date1.id;
                                    Invest.create(inv).catch(err => {
                                        res.status(500).send({
                                            message:
                                                err.message + "123" || "Some error occurred while creating the surgy."
                                        })
                                    })

                                }

                                for (var i = 0; i < json.onGoingProblems.length; i++) {
                                    problems["date"] = json.onGoingProblems[i].date;
                                    problems["problem"] = json.onGoingProblems[i].problem;
                                    problems["status"] = json.onGoingProblems[i].status;
                                    problems["treatingDr"] = json.onGoingProblems[i].treatingDr;
                                    problems["ptId"] = date1.id;
                                    History.create(problems).catch(err => {
                                        res.status(500).send({
                                            message:
                                                err.message + "123" || "Some error occurred while creating the problem."
                                        })
                                    })

                                }

                                for (var i = 0; i < json.familyHistory.length; i++) {
                                    family["date"] = json.familyHistory[i].date;
                                    family["notes"] = json.familyHistory[i].notes;
                                    family["problem"] = json.familyHistory[i].problem;
                                    family["relation"] = json.familyHistory[i].relation;
                                    family["ptId"] = date1.id;
                                    Family.create(family).catch(err => {
                                        res.status(500).send({
                                            message:
                                                err.message + "123" || "Some error occurred while creating the family."
                                        })
                                    })

                                }




                            }).then(datea => {
                                res.sent(datea);
                            })

                                .catch(err => {
                                    res.status(500).send({
                                        message:
                                            err.message + "123" || "Some error occurred while creating the Patient."
                                    })
                                })
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while creating the user."
                            });
                        });
                });

            } else {
                res.status(500).send({
                    message:
                        "userName or Email Already Exist"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving ."
            });
        });

    }*/
}
exports.find = (req, res) => {
  PT.findAll({
    where: {
      isDeleted: false,
      id: req.body.id
    }
  })
    .then(date => {
      // console.log(date);
      res.send(date)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving .'
      })
    })
}
exports.findAll = (req, res) => {
  PT.findAll({
    where: {
      isDeleted: false,
      id: req.body.id
    }
  })
    .then(date => {
      // console.log(date);
      res.send(date)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving .'
      })
    })
}
exports.getAllergyById = (req, res) => {
  Allergy.findAll({
    where: {
      isDeleted: false,
      ptId: req.body.ptId
    }
  })
    .then(date => {
      res.send(date)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'some error in get Allergy'
      })
    })
}
exports.getAllergyByIdCB = (req, res) => {
  db2.query(
    'SELECT pt.id,pt.name, pt.name, pt.date, pt.status, a.type FROM pt_allergies pt JOIN allergies a ON a.name = pt.name WHERE pt.isDeleted = 0 AND pt.ptId=' +
      req.body.ptId,
    function (err, result) {
      if (err) {
        console.log(err)
        res.status(500).send(err.message)
      } else {
        console.log(result)
        res.send(result)
      }
    }
  )
}

exports.getProblemsById = (req, res) => {
  History.findAll({
    where: {
      isDeleted: false,
      ptId: req.body.ptId
    }
  })
    .then(data => {
      console.log(data)
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'some error in get problems'
      })
    })
}
exports.findByAdmin = (req, res) => {
  db2.query(
    'SELECT PT.ptCode, PT.phone, PT.firstName, PT.lastName, PT.secondName, U.userName, U.Email FROM Patients AS PT JOIN users AS U ON U.id = PT.userId',
    function (err, result) {
      if (err) {
        console.log(err)
        res.status(500).send(err.message)
      } else {
        console.log(result)
        res.send(result)
      }
    }
  )
}
exports.deleteOnePtAllergy = (req, res) => {
  console.log('hollllaa')

  db2.query(
    'UPDATE pt_allergies SET isDeleted=1 WHERE id =' + req.body.id,

    function (err, result) {
      if (err) {
        res.status(500).send(err.message)
        console.log(err)
      } else {
        res.send(result)
        console.log('we did ', result)
      }
    }
  )
}
exports.resolveOnePtAllergy = (req, res) => {
  console.log('hollllaa')

  db2.query(
    'UPDATE pt_allergies SET status="Resolved" WHERE id =' + req.body.id,

    function (err, result) {
      if (err) {
        res.status(500).send(err.message)
        console.log(err)
      } else {
        res.send(result)
        console.log('we did ', result)
      }
    }
  )
}
exports.deleteOnePtProblem = (req, res) => {
  console.log('hollllaa')

  db2.query(
    'UPDATE pt_problems SET isDeleted=1 WHERE id =' + req.body.id,

    function (err, result) {
      if (err) {
        res.status(500).send(err.message)
        console.log(err)
      } else {
        res.send(result)
        console.log('we did ', result)
      }
    }
  )
}
exports.resolveOnePtProblem = (req, res) => {
  console.log('hollllaa')

  db2.query(
    'UPDATE pt_problems SET status="Resolved" WHERE id =' + req.body.id,

    function (err, result) {
      if (err) {
        res.status(500).send(err.message)
        console.log(err)
      } else {
        res.send(result)
        console.log('we did ', result)
      }
    }
  )
}

exports.deleteOnept_familyHistories = (req, res) => {
  console.log('hollllaa')

  db2.query(
    'UPDATE pt_familyHistories SET isDeleted=1 WHERE id =' + req.body.id,

    function (err, result) {
      if (err) {
        res.status(500).send(err.message)
        console.log(err)
      } else {
        res.send(result)
        console.log('we did ', result)
      }
    }
  )
}
exports.deleteOnept_surgery_histories = (req, res) => {
  console.log('hollllaa')

  db2.query(
    'UPDATE pt_surgery_histories SET isDeleted=1 WHERE id =' + req.body.id,

    function (err, result) {
      if (err) {
        res.status(500).send(err.message)
        console.log(err)
      } else {
        res.send(result)
        console.log('we did ', result)
      }
    }
  )
}
exports.deleteOnept_interventions = (req, res) => {
  console.log('hollllaa')

  db2.query(
    'UPDATE pt_interventions  SET isDeleted=1 WHERE id =' + req.body.id,

    function (err, result) {
      if (err) {
        res.status(500).send(err.message)
        console.log(err)
      } else {
        res.send(result)
        console.log('we did ', result)
      }
    }
  )
}
