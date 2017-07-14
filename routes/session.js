const express = require("express");
const router = express.Router();
const User = require("../models/User")
router.get("/login", function(req,res){
  res.render("session/login");
})

router.post("/logout", function(req,res){
  req.session.destroy(function(){
    res.redirect("/")
  })
})

router.post("/auth", function(req,res){
  // Have to check stuff
  User.findOne({
    username: req.body.username,
    password: req.body.password
  }).then( function(user){
    if (user){
      req.session.userId = user._id;
      res.redirect("/")
    } else {
      res.render("session/login")
    }
  })
})

module.exports = router;
