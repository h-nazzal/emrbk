const db = require("../../model");
const Surgy =  db.surgy ;
const Op = db.Sequelize.Op;
const crypto = require("crypto");
// Create and Save a new Surgery
exports.create = (req, res) => {
    if (!req.body.name  || !req.body.abbreviation) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      idCode = crypto.randomBytes(3).toString("hex");
      console.log(idCode);
    
      // Create a Surgery
      const surgy = {
        name: req.body.name,
        idCode: idCode,
        abbreviation: req.body.abbreviation,
      };
     
      // Save Surgery in the database
      Surgy.create(surgy)
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

// Retrieve all Surgery from the database.
exports.findAll = (req, res) => {
   
    //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Surgy.findAll({
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
            err.message || "Some error occurred while retrieving Surgery."
        });
      });
  };

// Find a single Surgery with an id
exports.findOne = (req, res) => {
    const ID = req.body.id;
  
    Surgy.findAll({
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
          message: "Error retrieving Surgery with id=" + ID
        });
      });
  };

// Update a Surgery by the id in the request
exports.update = (req, res) => {
    const id = req.body.id;
    
    Surgy.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Surgery was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Surgy with id=${id}. Maybe Surgery was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Surgery with id=" + id
        });
      });
  };

// Delete a Surgery with the specified id in the request
exports.delete = (req, res) => {
  req.body.isDeleted = true;
  exports.update(req,res);
};
