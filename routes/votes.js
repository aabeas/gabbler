const express = require("express");
const router = express.Router();
const Link = require("../models/Link")

router.post("/links/:id/upvote", function(req,res){
  Link.findOne({_id: req.params.id})
  .then(function(link){


    // remove any existing votes by this user
    for (var i = 0; i < link.votes.length; i++) {
      if (link.votes[i].username === req.user.username){
        console.log("WE FOUND AN EXISTING UP VOTE")
        link.votes.splice(i,1)
      }
    }

    link.votes.push({
      username: req.user.username,
      createdAt: Date.now(),
      value: 1
    })

    let voteValue = 0;
    for (var i = 0; i < link.votes.length; i++) {
      voteValue += link.votes[i].value
    }

    link.totalLikes = voteValue

    link.save()
    .then(function(link){
      res.redirect("/")
    })
  })
})

router.post("/links/:id/downvote", function(req,res){
  Link.findOne({_id: req.params.id})
  .then(function(link){

    // remove any existing votes by this user
    for (var i = 0; i < link.votes.length; i++) {
      if (link.votes[i].username === req.user.username){
        link.votes.splice(i,1)
      }
    }

    link.votes.push({
      username: req.user.username,
      createdAt: Date.now(),
      value: -1
    })

    let voteValue = 0;
    for (var i = 0; i < link.votes.length; i++) {
      voteValue += link.votes[i].value
    }

    link.totalLikes = voteValue
    link.save()
    .then(function(link){
      res.redirect("/")
    })
  })
})

module.exports = router;
