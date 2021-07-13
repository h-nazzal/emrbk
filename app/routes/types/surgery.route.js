module.exports = app => {
    const surgery = require("../../controllers/taypes/surgerise.controoler");
  
    var router = require("express").Router();
  
    // Create a new surgery
    router.post("/addsurgery", surgery.create);
  
    // Retrieve all surgery
    router.get("/getAll", surgery.findAll);
  
  
    // Retrieve a single surgery with id
    router.post("/getById", surgery.findOne);
  
    // Update a surgery with id
    router.put("/updatedsurgery", surgery.update);
  
    // Delete a surgery with id
    router.delete("/deletesurgery", surgery.delete);
  
    app.use('/surgery', router);
  };