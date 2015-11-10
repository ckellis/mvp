var express = require('express');
var app = express();
var postController = require('./posts/postController.js');
var bodyParser = require('body-parser');
var Post = require('./posts/postModel.js');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.get('/home', function(req, res, next) {
  postController.allPosts(req, res, next);
});

app.post('/post', function(req, res, next) {
  postController.newPost(req, res, next);
});

app.use(function (error, req, res, next) {
  console.error(error.stack);
  next(error);
});

app.use(function (error, req, res, next) {
  res.send(500, {error: error.message});
});

app.listen(3000);


