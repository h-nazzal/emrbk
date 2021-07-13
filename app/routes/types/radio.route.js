module.exports = app => {
    const radio = require("../../controllers/taypes/radio.controller");
  
    var router = require("express").Router();
  
    // Create a new radio
    router.post("/addRadio", radio.create);
  
    // Retrieve all radio
    router.get("/getAll", radio.findAll);
  
  
    // Retrieve a single radio with id
    router.post("/getById", radio.findOne);
  
    // Update a radio with id
    router.put("/updatedRadio", radio.update);
  
    // Delete a radio with id
    router.delete("/deleteRadio", radio.delete);
  
    app.use('/radio', router);
  };