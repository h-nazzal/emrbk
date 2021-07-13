const db = require("../../model");
const crypto = require("crypto");

const Radio = db.radiogist;
users =db.users
role = db.permission
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken") //Token module
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
var cors = require('cors')
// Create and Save a new radio
exports.create = (req, res) => {
  console.log("asd");
    if (!req.body.firstName || !req.body.lastName || !req.body.secondName || !req.body.radioFDId || !req.body.userName) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      var idCode = "R"
      idCode = idCode +  crypto.randomBytes(3).toString("hex");
      const radio = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        secondName: req.body.secondName,
        phone: parseInt(req.body.phone),
        radioFDId:req.body.radioFDId,
        idCode:idCode,
        userId:"",
      };
      var user = {
        tocken: "",
        userName: "",
        hash: "",
        Email: ""
    }
    var roles={
      userId:1,
      role:11,
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
                          roles["userId"] =data0.id;
                          radio["userId"] =data0.id;
                            role.create(roles).then(date1=>{
                              console.log(roles);
                              console.log(radio);
                              Radio.create(radio).then(date2=>{
                                res.send({
                                  message : "Record has been added successfully"
                              });
                              }).catch(err=>{
                                res.status(500).send({
                                  message:
                                      err.message + "asdsa" || "Some error occurred while creating the radio."
                              })
                              })
                            }).catch(err=>{
                              res.status(500).send({
                                message:
                                    err.message + "123" || "Some error occurred while creating the rolus."
                            })
                          })
                        })
                        .catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while creating the radio."
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

// Retrieve all radio from the database.
exports.findAll = (req, res) => {
   
    //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Radio.findAll({
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
            err.message || "Some error occurred while retrieving radios."
        });
      });
  };

// Find a single radio with an id
exports.findOne = (req, res) => {
    const ID = req.body.id;
  
    Radio.findAll({
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
          message: "Error retrieving radio with id=" + ID
        });
      });
  };

// Update a radio by the id in the request
exports.update = (req, res) => {
    const id = req.body.id;
    
    Radio.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "radio was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update radio with id=${id}. Maybe radio was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating radio with id=" + id
        });
      });
  };

// Delete a radio with the specified id in the request
exports.delete = (req, res) => {
  req.body.isDeleted = true;
  exports.update(req,res);
};



