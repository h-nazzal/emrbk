module.exports = app => {
    const labFrontDisk = require("../../controllers/frontDisk.controller/labFD.controller");
    const radioFd = require("../../controllers/frontDisk.controller/radioFD.controller")
    const pathoFD = require("../../controllers/frontDisk.controller/pathoFd.controller");
  
    var router = require("express").Router();
  
    // Create a new labFd
    router.post("/addLabFrontDisk", labFrontDisk.create);
    router.post("/addradioFrontDisk", radioFd.create);
    router.post("/addpathoFrontDisk", pathoFD.create);
  
    // Retrieve all labFds
    router.get("/getlabFD", labFrontDisk.findAll);
    router.get("/getradioFD", radioFd.findAll);
    router.get("/getpathoFD", pathoFD.findAll);
  
  
    // Retrieve a single labFd with id
    router.post("/getById", labFrontDisk.findOne);
  
    // Update a labFd with id
    router.put("/updatelabFD", labFrontDisk.update);
    router.put("/updatepathoFD", pathoFD.update);
    router.put("/updateradioFD", radioFd.update);
  
    // Delete a labFd with id
    router.delete("/deletelabFD", labFrontDisk.delete);
    router.delete("/deletepathobFD", pathoFD.delete);
    router.delete("/deleteradioFD", radioFd.delete);
  
    app.use('/frontdisk', router);
  };