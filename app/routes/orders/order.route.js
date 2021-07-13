const { radioOrder } = require("../../model");
const multer = require('multer')
const path = require("path");

module.exports = app => {
  const LabOrder = require("../../controllers/oders/labOrder.controller");
  const pathoOrder = require("../../controllers/oders/pathoOrder.controller");
  const RadioOrder = require("../../controllers/oders/radioOrder.controller");
  
    var router = require("express").Router();
  
    router.post('/labs/updateResult',
  multer({
      storage: multer.diskStorage({
          destination: (req, file, cb) => {
            cb(null, path.join(__dirname, "../../../public/labs"));
          },
          filename: (req, file, cb) => {
              pdf = Date.now() + "-" + file.originalname
              req.resultString = pdf

            cb(null, pdf);
          },
        }),
      }).single("result")
      ,LabOrder.UploadResult)

      router.post('/pathelogys/updateResult',
      multer({
          storage: multer.diskStorage({
              destination: (req, file, cb) => {
                cb(null, path.join(__dirname, "../../../public/pathologys"));
              },
              filename: (req, file, cb) => {
                
                  pdf = Date.now() + "-" + file.originalname
                  req.resultString = pdf
    
                cb(null, pdf);
              },
            }),
          }).single("result")
          ,pathoOrder.UploadResult)

          router.post('/radios/updateResult',
          multer({
              storage: multer.diskStorage({
                  destination: (req, file, cb) => {
                    cb(null, path.join(__dirname, "../../../public/radios"));
                  },
                  filename: (req, file, cb) => {
                      pdf = Date.now() + "-" + file.originalname
                      req.resultString = pdf
        
                    cb(null, pdf);
                  },
                }),
              }).single("result")
              ,RadioOrder.UploadResult)

    // Create a new order
    router.post("/addlabOrder", LabOrder.create);
    router.post("/addpathoOrder", pathoOrder.create);
    router.post("/addRadioOrder", RadioOrder.create);
   // 
   router.post("/getlabOrderByPtCode", LabOrder.findByCode);
   router.post("/getpathoOrderPtCode", pathoOrder.findByCode);
   router.post("/getRadioOrderPtCode", RadioOrder.findByCode);
    // Retrieve all order
    router.post("/getlabOrder", LabOrder.findAll);
    router.post("/getpathoOrder", pathoOrder.findAll);
    router.post("/getRadioOrder", RadioOrder.findAll);
    // 
    router.post("/getlabOrderbyLab", LabOrder.findBylabId);
    router.post("/getpathoOrderbyLab", pathoOrder.findBypathoId);
    router.post("/getRadioOrderbyLab", RadioOrder.findByradioId);
  
    //results start here
    router.post("/getResultsbyLab", LabOrder.findResultsBylabId);
    router.post("/getResultsbyPatho", pathoOrder.findResultsBypathoId);
    router.post("/getResultsbyRadio", RadioOrder.findResultsByradioId);
  
    //findByDrId

    router.post("/getlabOrderbyDrid", LabOrder.findByDrId);
    router.post("/getpathoOrderbyDrid", pathoOrder.findByDrId);
    router.post("/getradioOrderbyDrid", RadioOrder.findByDrId);
  

    // Retrieve a single LabOrder with id
    router.post("/getlabOrderByPtId", LabOrder.findByPtId);
    router.post("/getpathoOrderByPtId", pathoOrder.findByPtId);
    router.post("/getradioOrderByPtId", RadioOrder.findByPtId);

    router.post("/getlabOrderByPtId2", LabOrder.myfindByPtId);
    router.post("/getpathoOrderByPtId2", pathoOrder.myfindByPtId);
    router.post("/getradioOrderByPtId2", RadioOrder.myfindByPtId);

    // Retrieve a single LabOrder with id
    router.post("/getById", LabOrder.findOne);
    router.post("/getpathoById", pathoOrder.findOne);
    router.post("/getRadioOrderById", RadioOrder.findOne);
  
    // Update a order with id
    router.put("/updatelabOrder", LabOrder.updateLabId);
    router.put("/updatepathoOrder", pathoOrder.updatepathoId);
    router.put("/updateRadioOrder", RadioOrder.updateradioId);
   //update
   router.put('/acceptOrder',LabOrder.update)
   router.put('/acceptOrderforRadio',RadioOrder.update)
   router.put('/acceptOrderforPatho',pathoOrder.update)
    // Delete a order with id
    router.delete("/deletelabOrder", LabOrder.delete);
    router.delete("/deletepathoOrder", pathoOrder.delete);
    router.delete("/deleteRadioOrder", RadioOrder.delete);
  
    app.use('/order', router);
  };