module.exports = app => {
    const pharmacist = require("../../controllers/employees/pharmacist.controller");
  
    var router = require("express").Router();
  
    // Create a new Assistant
    router.post("/addPharmacist", pharmacist.create);
  
    // Retrieve all Assistants
    router.get("/getPharmacist", pharmacist.findAll);
  
  
    // Retrieve a single Assistant with id
    router.post("/getById", pharmacist.findOne);
  
    // Update a Assistant with id
    router.put("/updatePharmacist", pharmacist.update);
  
    // Delete a Assistant with id
    router.delete("/deletePharmacist", pharmacist.delete);
  
    app.use('/pharmacist', router);
  };