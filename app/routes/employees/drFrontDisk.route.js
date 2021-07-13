module.exports = app => {
    const drfrontDisk = require("../../controllers/frontDisk.controller/doctorFD");
  
    var router = require("express").Router();
  
    // Create a new DoctorFD
    router.post("/addDoctorFD", drfrontDisk.create);
  
    // Retrieve all DoctorFDs
    router.get("/getDoctorFD", drfrontDisk.findAll);
  
  
    // Retrieve a single DoctorFD with id
    router.post("/getById", drfrontDisk.findOne);
  
    // Update a DoctorFD with id
    router.put("/updateDoctorFD", drfrontDisk.update);
  
    // Delete a DoctorFD with id
    router.delete("/deleteDoctorFD", drfrontDisk.delete);
  
    app.use('/frontdisk', router);
  };