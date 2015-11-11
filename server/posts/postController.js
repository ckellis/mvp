var Post = require('./postModel.js');
var bodyParser = require('body-parser');

module.exports = {
  allPosts: function (req, res, next) {
    Post.find({})
      .exec(function (err, posts) {
        if (err) {
          console.log(err);
        } else {
          res.json(posts);
        }
      });
  },

  newPost: function (req, res, next) {
    var newPost = new Post({
      title: req.body.title,
      message: req.body.message,
      author: req.body.author
    }).save(function (err) {
      if (err) return handleError(err);
    })
    .then(function (createdPost) {
      if (createdPost) {
        res.json(createdPost);
      }
    });
  }
};
