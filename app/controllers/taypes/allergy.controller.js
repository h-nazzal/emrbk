const db = require('../../model')
const Allergy = db.allergy
const Op = db.Sequelize.Op
const crypto = require('crypto')
var db2 = require('../../dataBase/dataBaseConnection')

// Create and Save a new allergy
exports.create = (req, res) => {
  if (!req.body.name || !req.body.type) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }
  idCode = crypto.randomBytes(3).toString('hex')
  console.log(idCode)
  // Create a allergy
  const allergy = {
    name: req.body.name,
    type: req.body.type,
    idCode: idCode
  }
  console.log(allergy)

  // Save allergy in the database
  Allergy.create(allergy)
    .then(data => {
      res.send({
        message: 'Record has been added successfully'
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the allergy.'
      })
    })
}

// Retrieve all allergy from the database.
exports.findAll = (req, res) => {
  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Allergy.findAll({
    where: {
      isDeleted: false
    }
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving allergys.'
      })
    })
}

// Find a single allergy with an id
exports.findOne = (req, res) => {
  const ID = req.body.id

  Allergy.findAll({
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
        message: 'Error retrieving allergy with id=' + ID
      })
    })
} // Find a single allergy with an id
exports.addPtAllergy = (req, res) => {
  console.log('hollllaa')
  let json = req.body

  console.log(json)
  // json
  // for (var i = 0; i < json.Allergy.length; i++) {

  //    db2.query('INSERT INTO ' + '`pt_allergies`' + '(type,name,status,date,ptid) VALUES(' + '"' + json.Allergy[i].type + '"' + ',' + '"' + json.Allergy[i].name + '"' + ',' + '"' + json.Allergy[i].status + '", "'+json.Allergy[i].date+ '",'+ result["insertId"] + ');', function (err, result2) {
  //       if (err) {
  //          console.log(err);
  //          res.send(err);
  //       }
  //    })
}
exports.addOneAllergy = (req, res) => {
  console.log('hollllaa')
  let a = req.body
  db2.query(
    'INSERT INTO ' +
      '`pt_allergies`' +
      '(name,status,date,ptid) VALUES ("' +
      a.name +
      '","' +
      a.status +
      '","' +
      a.date +
      '",' +
      a.ptId +
      ')',
    'INSERT INTO ' +
      '`pt_allergies`' +
      '(type),SELECT type from allergies  WHERE name=' +
      a.name,

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

//       if (err) {
//          console.log(err);
//          res.send(err);
//       }
//    })
// json
// for (var i = 0; i < json.Allergy.length; i++) {

//    db2.query('INSERT INTO ' + '`pt_allergies`' + '(type,name,status,date,ptid) VALUES(' + '"' + json.Allergy[i].type + '"' + ',' + '"' + json.Allergy[i].name + '"' + ',' + '"' + json.Allergy[i].status + '", "'+json.Allergy[i].date+ '",'+ result["insertId"] + ');', function (err, result2) {
//       if (err) {
//          console.log(err);
//          res.send(err);
//       }
//    })

// Update a allergy by the id in the request
exports.update = (req, res) => {
  const id = req.body.id

  Allergy.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'allergy was updated successfully.'
        })
      } else {
        res.send({
          message: `Cannot update allergy with id=${id}. Maybe allergy was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating allergy with id=' + id
      })
    })
}

// Delete a allergy with the specified id in the request
exports.delete = (req, res) => {
  req.body.isDeleted = true
  exports.update(req, res)
}
