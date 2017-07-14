const express = require("express");
const router = express.Router();
const User = require("../models/User")

router.get("/register", function(req,res){
  res.render("registration/new");
})

router.post("/register", function(req, res){
  const user = new User();
  user.username = req.body.username
  user.password = req.body.password
  user.bio = req.body.bio
  user.email = req.body.email
  user.save()
  .then(function(user){
    // GREAT! Sign them in!
    req.session.userId = user._id
    // Send along their way
    res.redirect("/")
  })
  .catch( function(error){
    console.log(error)
    res.render("registration/new", {
      user: user,
      error: error
    })
  })

})

module.exports = router;
