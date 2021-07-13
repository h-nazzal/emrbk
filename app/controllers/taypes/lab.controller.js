const db = require("../../model");
const Lab =  db.labs ;
const Op = db.Sequelize.Op;
const crypto = require("crypto");

// Create and Save a new lab
exports.create = (req, res) => {
    if (!req.body.name  || !req.body.abbreviation) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      idCode = crypto.randomBytes(3).toString("hex");
      console.log(idCode);
      // Create a lab
      const lab = {
        name: req.body.name,
        idCode: idCode,
        abbreviation: req.body.abbreviation,
      };
     
      // Save lab in the database
      Lab.create(lab)
        .then(data => {
          res.send({
            message : "Record has been added successfully"
        });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the lab."
          });
        });
    };

// Retrieve all lab from the database.
exports.findAll = (req, res) => {
   
    //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Lab.findAll({
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
            err.message || "Some error occurred while retrieving labs."
        });
      });
  };

// Find a single lab with an id
exports.findOne = (req, res) => {
    const ID = req.body.id;
  
    Lab.findAll({
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
          message: "Error retrieving lab with id=" + ID
        });
      });
  };

// Update a lab by the id in the request
exports.update = (req, res) => {
    const id = req.body.id;
    
    Lab.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "lab was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update lab with id=${id}. Maybe lab was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating lab with id=" + id
        });
      });
  };

// Delete a lab with the specified id in the request
exports.delete = (req, res) => {
  req.body.isDeleted = true;
  exports.update(req,res);
};



