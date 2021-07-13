const db = require("../../model");
const Allergy = db.allergy;
const Op = db.Sequelize.Op;
const crypto = require("crypto");


// Create and Save a new allergy
exports.create = (req, res) => {
  if (!req.body.name || !req.body.type) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
    idCode = crypto.randomBytes(3).toString("hex");
    console.log(idCode);
  // Create a allergy
  const allergy = {
    name: req.body.name,
    type: req.body.type,
    idCode:idCode,
  };
  console.log(allergy);

  // Save allergy in the database
  Allergy.create(allergy)
    .then(data => {
      res.send({
        message: "Record has been added successfully"
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the allergy."
      });
    });
};

// Retrieve all allergy from the database.
exports.findAll = (req, res) => {

  //var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Allergy.findAll({
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
          err.message || "Some error occurred while retrieving allergys."
      });
    });
};

// Find a single allergy with an id
exports.findOne = (req, res) => {
  const ID = req.body.id;

  Allergy.findAll({
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
        message: "Error retrieving allergy with id=" + ID
      });
    });
};

// Update a allergy by the id in the request
exports.update = (req, res) => {
  const id = req.body.id;

  Allergy.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "allergy was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update allergy with id=${id}. Maybe allergy was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating allergy with id=" + id
      });
    });
};

// Delete a allergy with the specified id in the request
exports.delete = (req, res) => {
  req.body.isDeleted = true;
  exports.update(req, res);
};



