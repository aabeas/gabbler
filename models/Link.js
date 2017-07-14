
const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');

const linkSchema = new mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  username: {type: String, required: true},
  totalLikes: {type: Number, default: 0},
  votes: [
    {
      username: {type: String, required: true},
      createdAt: {type: Date, required: true},
      value: {type: Number, default: 0, required: true}
    }
  ]
})
linkSchema.plugin(timestamps);
const Link = mongoose.model('Link', linkSchema);
module.exports = Link;
