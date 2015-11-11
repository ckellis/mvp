var express = require('express');
var app = express();
var postController = require('./posts/postController.js');
var bodyParser = require('body-parser');
var Post = require('./posts/postModel.js');

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  return next();
});

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

// app.use(function (error, req, res, next) {
//   res.send(500, {error: error.message});
// });

app.listen(3000);


