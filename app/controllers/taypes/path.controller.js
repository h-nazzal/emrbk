const db = require("../../model");
const Patho =  db.patho ;
const Op = db.Sequelize.Op;
const crypto = require("crypto");

// Create and Save a new Patho
exports.create = (req, res) => {
    if (!req.body.name || !req.body.abbreviation) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      idCode = crypto.randomBytes(3).toString("hex");
      console.log(idCode);
    
      // Create a Patho
      const patho = {
        name: req.body.name,
        idCode: idCode,
        abbreviation: req.body.abbreviation,
      };
     
      // Save Patho in the database
      Patho.create(patho)
        .then(data => {
          res.send({
            message : "Record has been added successfully"
        });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the patho."
          });
        });
    };

// Retrieve all Patho from the database.
exports.findAll = (req, res) => {
   
    //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Patho.findAll({
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
            err.message || "Some error occurred while retrieving pathos."
        });
      });
  };

// Find a single Patho with an id
exports.findOne = (req, res) => {
    const ID = req.body.id;
  
    Patho.findAll({
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
          message: "Error retrieving Patho with id=" + ID
        });
      });
  };

// Update a Patho by the id in the request
exports.update = (req, res) => {
    const id = req.body.id;
    
    Patho.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Patho was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Patho with id=${id}. Maybe Patho was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Patho with id=" + id
        });
      });
  };

// Delete a Patho with the specified id in the request
exports.delete = (req, res) => {
  req.body.isDeleted = true;
  exports.update(req,res);
};



