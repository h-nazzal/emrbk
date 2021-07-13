module.exports = app => {
    const patho = require("../../controllers/employees/pathologist.controller");
  
    var router = require("express").Router();
  
    // Create a new Patholog
    router.post("/addPathology", patho.create);
  
    // Retrieve all Pathologs
    router.get("/getPathology", patho.findAll);
  
  
    // Retrieve a single Patholog with id
    router.post("/getById", patho.findOne);
  
    // Update a Patholog with id
    router.put("/updatePathology", patho.update);
  
    // Delete a Patholog with id
    router.delete("/deletePathology", patho.delete);
  
    app.use('/patho', router);
  };