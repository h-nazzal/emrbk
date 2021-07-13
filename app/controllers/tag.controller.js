const db = require("../model");
const tag = db.tag;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log("test");
    if (!req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create a tag
      const tags = {
        name: req.body.name,
      };
    
      // Save Tutorial in the database
      tag.create(tags)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Tutorial."
          });
        });
    };