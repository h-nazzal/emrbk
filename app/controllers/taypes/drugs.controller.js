const db = require("../../model");
const Drugs = db.drug;
const Op = db.Sequelize.Op;
const crypto = require("crypto");
// Create and Save a new drugs
exports.create = (req, res) => {
    if ( !req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      idCode = crypto.randomBytes(3).toString("hex");
      console.log(idCode);
      // Create a drugs
      const drug = {
        name: req.body.name,
        idCode: idCode,
      };
      
      // Save drugs in the database
      Drugs.create(drug)
        .then(data => {
          res.send({
            message : "Record has been added successfully"
        });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the drug."
          });
        });
    };

// Retrieve all drugs from the database.
exports.findAll = (req, res) => {
   
    //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Drugs.findAll({
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
            err.message || "Some error occurred while retrieving drug."
        });
      });
  };

// Find a single drugs with an id
exports.findOne = (req, res) => {
    const ID = req.body.id;
  
    Drugs.findAll({
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
          message: "Error retrieving drug with id=" + ID
        });
      });
  };

// Update a drugs by the id in the request
exports.update = (req, res) => {
    const id = req.body.id;
    
    Drugs.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "drug was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update drug with id=${id}. Maybe drug was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating drug with id=" + id
        });
      });
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  req.body.isDeleted = true;
  exports.update(req,res);
};



