var db = require('../db');
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
  title: String,
  message: String,
  author: String,
  timestamp: Date
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;
