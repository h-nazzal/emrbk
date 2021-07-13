module.exports = app => {
    const Nurse = require("../../controllers/employees/nurse.controller");
  
    var router = require("express").Router();
  
    // Create a new Nurse
    router.post("/addNurse", Nurse.create);
    router.get("/getNurse", Nurse.findAll);
    router.put("/updateNurse", Nurse.update);
    router.delete("/deleteNurse", Nurse.delete);

    // Retrieve all record for pt by ptId
    router.post("/getByPtId", Nurse.getByPtId);
  
    // Retrieveall record for pt by date
    router.post("/getByDate", Nurse.getByDate);
  
    //Create a new NurseModule
    router.post("/addRecord", Nurse.createNurseModule);
  
    // Delete a Nurse with id
    router.delete("/deleteRecorder", Nurse.deleteRecorder);
  
    app.use('/nurse', router);
  };