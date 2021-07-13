const db = require("../../model");
const crypto = require("crypto");
const pharmacist = db.pharmacist;
users = db.users
role = db.permission
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken") //Token module
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
var cors = require('cors')

// Create and Save a new pharmacist
exports.create = (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.secondName || !req.body.userName) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    var idCode = "ٌPH"
    idCode = idCode + crypto.randomBytes(3).toString("hex");
    const patho = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        secondName: req.body.secondName,
        phone: parseInt(req.body.phone),
        idCode: idCode,
        userId: "",
    };
    var user = {
        tocken: "",
        userName: "",
        hash: "",
        Email: ""
    }
    var roles = {
        userId: 1,
        role: 17, // pharmicist
    }
    users.findAll({
        where: {
            [Op.or]: [
                { Email: req.body.Email },
                { userName: req.body.userName }
            ]
        }

    })
        .then(data => {
            if (data.length === 0) {
                jwt.sign({ user: user }, 'secretkey', (err, token) => {
                    user["tocken"] = token;
                });
                console.log(user["tocken"])
                //01205119956aa
                bcrypt.hash(req.body.password, 10).then(data => {
                    console.log(data)
                    user["hash"] = '"' + data + '"'
                    user["Email"] = req.body.Email;
                    user["userName"] = req.body.userName
                    // Save user in the database
                    users.create(user)
                        .then(data0 => {
                            roles["userId"] = data0.id;
                            patho["userId"] = data0.id;
                            role.create(roles).then(date1 => {
                                pharmacist.create(patho).then(date2 => {
                                    res.send({
                                        message: "Record has been added successfully"
                                    });
                                }).catch(err => {
                                    res.status(500).send({
                                        message:
                                            err.message + "asdsa" || "Some error occurred while creating the pharmacist."
                                    })
                                })
                            }).catch(err => {
                                res.status(500).send({
                                    message:
                                        err.message + "123" || "Some error occurred while creating the rolus."
                                })
                            })
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while creating the pharmacist."
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

};

exports.findAll = (req, res) => {

    //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    pharmacist.findAll({
        where: {
            isDeleted: false
        }

    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving pharmacist."
            });
        });
};

// Find a single pharmacist with an id
exports.findOne = (req, res) => {
    const ID = req.body.id;
  
    pharmacist.findAll({
      where: {
        isDeleted: false,
        id: ID
      }
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving pharmacist with id=" + ID
        });
      });
  };

// Update a pharmacist by the id in the request
exports.update = (req, res) => {
    const id = req.body.id;
    
    pharmacist.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "pharmacist was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update pharmacist with id=${id}. Maybe pharmacist was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating pharmacist with id=" + id
        });
      });
  };

// Delete a pharmacist with the specified id in the request
exports.delete = (req, res) => {
  req.body.isDeleted = true;
  exports.update(req,res);
};




