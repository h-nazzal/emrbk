module.exports = app => {
    const Disease = require("../../controllers/taypes/diseases.controller");
  
    var router = require("express").Router();
  
    // Create a new Disease
    router.post("/addDiseases", Disease.create);
  
    // Retrieve all Disease
    router.get("/getAll", Disease.findAll);
  
  
    // Retrieve a single Disease with id
    router.post("/getById", Disease.findOne);
  
    // Update a Disease with id
    router.put("/updateDiseases", Disease.update);
  
    // Delete a Disease with id
    router.delete("/deleteDiseases", Disease.delete);
  
    app.use('/disease', router);
  };