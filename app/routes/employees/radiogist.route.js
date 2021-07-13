module.exports = app => {
  const RADIO = require("../../controllers/employees/radiogist.controller");

  var router = require("express").Router();

  // Create a new radiology
  router.post("/addRadiology", RADIO.create);

  // Retrieve all radiologys
  router.get("/getRadiology", RADIO.findAll);


  // Retrieve a single radiology with id
  router.post("/getById", RADIO.findOne);

  // Update a radiology with id
  router.put("/updateradiology", RADIO.update);

  // Delete a radiology with id
  router.delete("/deleteradiology", RADIO.delete);

  app.use('/radiology', router);
};