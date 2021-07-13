module.exports = app => {
    const user = require("../../controllers/Authenticate/autho.contrrol");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/register", user.register);
    //login
    router.post("/login",user.login);
    router.post("/userInfo",user.findinfo);
    router.post("/userInfoForPt",user.findinfoForPt);
    router.post("/getPtId",user.findptId);
    router.post("/forgetPass",user.forgetPass);
    router.post("/getCode",user.checkCode);
    router.post("/updatePass",user.updatePass);
    



    app.use('/autho', router);
  };