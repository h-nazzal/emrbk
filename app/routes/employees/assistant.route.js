module.exports = app => {
    const Assistant = require("../../controllers/employees/assistant.controller");
  
    var router = require("express").Router();
  
    // Create a new Assistant
    router.post("/addAssistant", Assistant.create);
  
    // Retrieve all Assistants
    router.get("/getAssistant", Assistant.findAll);
  
  
    // Retrieve a single Assistant with id
    router.post("/getById", Assistant.findOne);
  
    // Update a Assistant with id
    router.put("/updateAssistant", Assistant.update);
  
    // Delete a Assistant with id
    router.delete("/deleteAssistant", Assistant.delete);
  
    app.use('/assistant', router);
  };