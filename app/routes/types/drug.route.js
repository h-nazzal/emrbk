module.exports = app => {
    const Drug = require("../../controllers/taypes/drugs.controller");
  
    var router = require("express").Router();
  
    // Create a new Drug
    router.post("/addDrug", Drug.create);
  
    // Retrieve all Drug
    router.get("/getAll", Drug.findAll);
  
  
    // Retrieve a single Drug with id
    router.post("/getById", Drug.findOne);
  
    // Update a Drug with id
    router.put("/updateDrug", Drug.update);
  
    // Delete a Drug with id
    router.delete("/deleteDrug", Drug.delete);
  
    app.use('/drug', router);
  };