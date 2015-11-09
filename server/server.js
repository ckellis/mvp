var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var postRouter = express.Router();
require('./posts/postRoutes.js')(postRouter);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../client/app/home'));
app.use(express.static(__dirname + '/../client/app/posts'));

app.use('/post', postRouter);

app.use(function (error, req, res, next) {
  console.error(error.stack);
  next(error);
});

app.use(function (error, req, res, next) {
  res.send(500, {error: error.message});
});

app.listen(3000);

module.exports = app;
