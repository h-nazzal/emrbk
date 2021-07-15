module.exports = app => {
  const pt = require('../controllers/patient.controller/pt.controller')
  const Allergy = require('../controllers/taypes/allergy.controller')

  var router = require('express').Router()

  // Create a new Allergy
  router.post('/addPT', pt.create)
  router.post('/findPt', pt.find)
  router.get('/findByAdmin', pt.findByAdmin)
  router.post('/getAllergyById', pt.getAllergyById)
  router.post('/getAllergyByIdCB', pt.getAllergyByIdCB)
  router.post('/getProblemsById', pt.getProblemsById)

  // Retrieve all problems
  router.post('/addPtAllergy', Allergy.addPtAllergy)
  router.post('/addOneAllergy', Allergy.addOneAllergy)

  // Retrieve a single Allergy with id
  //router.post("/getById", Allergy.findOne);

  // Update a Allergy with id
  //router.put("/updateAllergy", Allergy.update);

  // Delete a Allergy with id
  //router.delete("/deleteAllergy", Allergy.delete);

  app.use('/pt', router)
}
