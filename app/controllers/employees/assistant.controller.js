const db = require("../../model");
const Assistant = db.assistant;
users =db.users
role = db.permission
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken") //Token module
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
var cors = require('cors')
// Create and Save a new assistant
exports.create = (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.address || !req.body.phone || !req.body.userName) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      const assistant = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        secondName:req.body.secondName,
        address: req.body.address,
        phone: parseInt(req.body.phone),
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
      role:14,
    }
  //same in register module 
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
               
                bcrypt.hash(req.body.password, 10).then(data => {
                    console.log(data)
                    user["hash"] = '"' + data + '"'
                    user["Email"] = req.body.Email;
                    user["userName"] = req.body.userName
                    // Save user in the database
                    users.create(user)
                        .then(data0 => {
                          roles["userId"] =data0.id;
                          assistant["userId"] =data0.id;
                            role.create(roles).then(date1=>{
                              console.log(roles);
                              console.log(assistant);
                              Assistant.create(assistant).then(date2=>{
                                res.send({
                                  message : "Record has been added successfully"
                              });
                              }).catch(err=>{
                                res.status(500).send({
                                  message:
                                      err.message + "asdsa" || "Some error occurred while creating the assistant."
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
    
    
    };

// Retrieve all assistant from the database.
exports.findAll = (req, res) => {
   
    //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Assistant.findAll({
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
            err.message || "Some error occurred while retrieving assistants."
        });
      });
  };

// Find a single assistant with an id
exports.findOne = (req, res) => {
    const ID = req.body.id;
  
    Assistant.findAll({
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
          message: "Error retrieving assistant with id=" + ID
        });
      });
  };

// Update a assistant by the id in the request
exports.update = (req, res) => {
    const id = req.body.id;
    
    Assistant.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "assistant was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update assistant with id=${id}. Maybe assistant was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating assistant with id=" + id
        });
      });
  };

// Delete a assistant with the specified id in the request
exports.delete = (req, res) => {
  req.body.isDeleted = true;
  exports.update(req,res);
};



