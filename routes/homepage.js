
const express = require("express");
const router = express.Router();
const Link = require("../models/Link");

router.get("/", function(req,res){
  Link.find().sort("-totalLikes").sort("createdAt")
  .then(function(links){

    res.render("index", {
      user: req.user,
      links: links
    });
  })
})

module.exports = router;
