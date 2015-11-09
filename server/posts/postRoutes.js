var postController = require('./postController.js');

module.exports = function (app) {
  app.post('/post', postController.newPost);
  app.get('/home', postController.allPosts);
};
