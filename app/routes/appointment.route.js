module.exports = app => {
    const appoinment = require("../controllers/appoinment.controller");
  
    var router = require("express").Router();
  
    // Create a new appoinment
    router.post("/addAppoinment", appoinment.create);
  
    // Retrieve all appoinments
    router.post("/getAppointment", appoinment.findAll);
    //get appoinments by ptId
    router.post('/getAppoinmentbyPtid',appoinment.findPtid)

    // get all appoinment by drId
    router.post('/getAppoinmentbyDrId',appoinment.finddrAppo)
  

    // Retrieve a single appoinment with id
    router.post("/getByDate", appoinment.findOne);
  
    // Update a appoinment with id
    router.put("/updateAppointment", appoinment.update);
  
    // Delete a appoinment with id
   router.delete("/deleteAppointment", appoinment.delete);
  
    app.use('/appointment', router);
  };