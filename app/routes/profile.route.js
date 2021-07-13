const multer = require('multer')
const path = require("path");
var router = require("express").Router();
const ProfileController = require("../controllers/Profile/profile.controller") 

var img=''
module.exports  = app=>{
    router.post("/photo",
multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
          console.log(__dirname)
        cb(null, path.join(__dirname, "../../public/images"));
      },
      filename: (req, file, cb) => {
          img = Date.now() + "-" + file.originalname
          req.imageString = img
        cb(null, img);
      },
    }),
  }).single("image")
  , ProfileController.uploadPhoto
);

router.get('/getUser/:userId',ProfileController.getUser)

app.use('/profile',router)
}