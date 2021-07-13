module.exports = app => {
    const Chemist = require("../../controllers/employees/chemist.controller");
  
    var router = require("express").Router();
  
    // Create a new Chemist
    router.post("/addChemist", Chemist.create);
  
    // Retrieve all Chemists
    router.get("/getChemist", Chemist.findAll);
  
  
    // Retrieve a single Chemist with id
    router.post("/getById", Chemist.findOne);
  
    // Update a Chemist with id
    router.put("/updateChemist", Chemist.update);
  
    // Delete a Chemist with id
    router.delete("/deleteChemist", Chemist.delete);
  
    app.use('/chemist', router);
  };