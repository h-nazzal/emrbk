module.exports = app => {
    const patho = require("../../controllers/taypes/path.controller");
  
    var router = require("express").Router();
  
    // Create a new patho
    router.post("/addpatho", patho.create);
  
    // Retrieve all patho
    router.get("/getAll", patho.findAll);
  
  
    // Retrieve a single patho with id
    router.post("/getById", patho.findOne);
  
    // Update a patho with id
    router.put("/updatedpatho", patho.update);
  
    // Delete a patho with id
    router.delete("/deletepatho", patho.delete);
  
    app.use('/patho', router);
  };