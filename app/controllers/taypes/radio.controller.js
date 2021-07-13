const db = require("../../model");
const Radio =  db.radio ;
const Op = db.Sequelize.Op;
const crypto = require("crypto");
// Create and Save a new Radio
exports.create = (req, res) => {
    if (!req.body.name  || !req.body.abbreviation) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      idCode = crypto.randomBytes(3).toString("hex");
      console.log(idCode);
    
      // Create a Radio
      const radio = {
        name: req.body.name,
        idCode: idCode,
        abbreviation: req.body.abbreviation,
      };
     
      // Save Radio in the database
      Radio.create(radio)
        .then(data => {
          res.send({
            message : "Record has been added successfully"
        });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the radio."
          });
        });
    };

// Retrieve all Radio from the database.
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

// Find a single Radio with an id
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
          message: "Error retrieving Radio with id=" + ID
        });
      });
  };

// Update a Radio by the id in the request
exports.update = (req, res) => {
    const id = req.body.id;
    
    Radio.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Radio was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Radio with id=${id}. Maybe Radio was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Radio with id=" + id
        });
      });
  };

// Delete a Radio with the specified id in the request
exports.delete = (req, res) => {
  req.body.isDeleted = true;
  exports.update(req,res);
};
