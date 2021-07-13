module.exports = app => {
    const doctor = require("../../controllers/employees/doctor.controller");
  
    var router = require("express").Router();
  
    // Create a new Doctor
    router.post("/addDoctor", doctor.create);
  
    // Retrieve all Doctors
    router.get("/getDoctor", doctor.findAll);
  
  
    // Retrieve a single Doctor with id
    router.post("/getById", doctor.findOne);
  
    // Update a Doctor with id
    router.put("/updateDoctor", doctor.update);
  
    // Delete a Doctor with id
    router.delete("/deleteDoctor", doctor.delete);
  
    app.use('/doctor', router);
  };