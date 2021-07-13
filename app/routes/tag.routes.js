module.exports = app => {
    const tag = require("../controllers/tag.controller.js");
  
    var router = require("express").Router();
  
    // Create a new tag
    router.post("/", tag.create);
  
    app.use('/api/tag', router);
  };