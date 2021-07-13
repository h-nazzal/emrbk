module.exports = app => {
    const Allergy = require("../../controllers/taypes/allergy.controller");
  
    var router = require("express").Router();
  
    // Create a new Allergy
    router.post("/addAllergy", Allergy.create);
  
    // Retrieve all Allergy
    router.get("/getAllergy", Allergy.findAll);
  
  
    // Retrieve a single Allergy with id
    router.post("/getById", Allergy.findOne);
  
    // Update a Allergy with id
    router.put("/updateAllergy", Allergy.update);
  
    // Delete a Allergy with id
    router.delete("/deleteAllergy", Allergy.delete);
  
    app.use('/allergy', router);
  };