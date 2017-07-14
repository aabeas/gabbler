const express = require("express");
const router = express.Router()
const Link = require("../models/Link")

router.get("/links/new", function(req,res){
  res.render("links/new")
})

router.post("/links", function(req,res){
  const link = new Link()
  link.title = req.body.title
  link.body = req.body.body
  link.username = req.user.username
  link.save()
  .then(function(link){
    res.redirect("/")
  })
  .catch(function(error){
    res.render("links/new", {
      error: error,
      link: link
    })
  })
})

module.exports = router;
