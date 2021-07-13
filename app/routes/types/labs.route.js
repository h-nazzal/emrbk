module.exports = app => {
    const lab = require("../../controllers/taypes/lab.controller");
  
    var router = require("express").Router();
  
    // Create a new lab
    router.post("/addlab", lab.create);
  
    // Retrieve all lab
    router.get("/getAll", lab.findAll);
  
  
    // Retrieve a single lab with id
    router.post("/getById", lab.findOne);
  
    // Update a lab with id
    router.put("/updatedlab", lab.update);
  
    // Delete a lab with id
    router.delete("/deletelab", lab.delete);
  
    app.use('/lab', router);
  };