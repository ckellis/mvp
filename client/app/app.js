var app = angular.module('app', [
  'ui.router'
])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
        url: '/',
        templateUrl: './home.html',
        controller: 'postController'
    })

    .state('post', {
        url: '/post',
        templateUrl: './posts.html'
    });
    $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
})
.factory('Posts', function ($http) {

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
    var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20piratespeak.translate%20where%20html%20%3D%20%22'+ post.message +'%22&format=json&diagnostics=true&env=store%3A%2F%2Fkid666.com%2Fpiratespeak&callback=JSON_CALLBACK';

   return $http.jsonp(url)
    .success(function (resp) {
      post.message = resp.query.results.result;

      $http({
        method: 'POST',
        url: '/post',
        data: post
      });
    });
  };

  return {
    getAll: getAll,
    addPost: addPost
  };
})
.controller('postController', function ($scope, $location, Posts) {
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


