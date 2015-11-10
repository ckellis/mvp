var app = angular.module('app', [
  'ui.router'
])
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
        url: '/home',
        templateUrl: './home.html',
        controller: 'postController'
    })

    .state('post', {
        url: '/post',
        templateUrl: './posts.html'
    });
});

app.factory('Posts', function ($http) {

  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/home'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addPost = function (post) {
    return $http({
      method: 'POST',
      url: '/post',
      data: post
    });
  };

  return {
    getAll: getAll,
    addPost: addPost
  };
});

app.controller('postController', function ($scope, $location, Posts) {
  $scope.data = {};
  $scope.getPosts = function () {
    Posts.getAll()
      .then(function (posts) {
        $scope.data.posts = posts;
      })
      .catch(function (err) {
        console.error(err);
      });
  };
  $scope.getPosts();

  $scope.post = {};
  $scope.newPost = function () {
    Posts.addPost($scope.post)
      .then(function (err) {
        $location.path('/home');
      })
      .catch(function (err) {
        console.error(err);
      });
  };
});
