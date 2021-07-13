const db = require("../../model");
const Diseases = db.diseases;
const Op = db.Sequelize.Op;
const crypto = require("crypto");

// Create and Save a new disease
exports.create = (req, res) => {
    if (!req.body.code || !req.body.abbreviation|| !req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      idCode = crypto.randomBytes(3).toString("hex");
      console.log(idCode);
    
      // Create a disease
      const disease = {
        idCode:idCode,
        name: req.body.name,
        code: req.body.code,
        abbreviation: req.body.abbreviation,
      };

    
      // Save disease in the database
      Diseases.create(disease)
        .then(data => {
          res.send({
            message : "Record has been added successfully"
        });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the disease."
          });
        });
    };

// Retrieve all disease from the database.
exports.findAll = (req, res) => {
   
    //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Diseases.findAll({
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
            err.message || "Some error occurred while retrieving diseases."
        });
      });
  };

// Find a single disease with an id
exports.findOne = (req, res) => {
    const ID = req.body.id;
  
    Diseases.findAll({
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
          message: "Error retrieving disease with id=" + ID
        });
      });
  };

// Update a disease by the id in the request
exports.update = (req, res) => {
    const id = req.body.id;
    
    Diseases.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "disease was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update disease with id=${id}. Maybe disease was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating disease with id=" + id
        });
      });
  };

// Delete a disease with the specified id in the request
exports.delete = (req, res) => {
  req.body.isDeleted = true;
  exports.update(req,res);
};



