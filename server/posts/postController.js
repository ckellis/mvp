var Post = require('./postModel.js');

module.exports = {
  allPosts: function (req, res, next) {
    Post.findAll({})
      .then(function (posts) {
        res.json(posts);
      })
      .fail(function (error) {
        next(error);
      });
    },

  newPost: function (req, res, next) {
          var newPost = new Post({
            title: req.body.title,
            message: req.body.message,
            author: req.body.author
          }).save(function (err, savedPost) {
            if (err) {
              next(err);
            } else {
              res.send(200, savedPost);
            }
          return newPost;
      })
      .then(function (createdPost) {
        if (createdPost) {
          res.json(createdPost);
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
};
