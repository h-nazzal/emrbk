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
  router.delete('/deleteOnept_interventions', pt.deleteOnept_interventions)
  router.delete('/deleteOnePtAllergy', pt.deleteOnePtAllergy)
  router.delete('/resolveOnePtAllergy', pt.resolveOnePtAllergy)
  router.delete('/deleteOnePtProblem', pt.deleteOnePtProblem)
  router.delete('/resolveOnePtProblem', pt.resolveOnePtProblem)
  router.delete('/deleteOnept_familyHistories', pt.deleteOnept_familyHistories)
  router.delete(
    '/deleteOnept_surgery_histories',
    pt.deleteOnept_surgery_histories
  )
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
