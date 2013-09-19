angular.module('App', ['firebase', 'ngRoute', 'ngAnimate','md5'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {controller: 'MainCtrl', templateUrl: '/app/templates/posts/index.html'})
      .when('/posts/new', {controller: 'NewCtrl', templateUrl: '/app/templates/posts/form.html'})
      .when('/posts/:id/edit', {controller: 'EditCtrl', templateUrl: '/app/templates/posts/form.html'})
      .when('/posts/:id/comments', {controller: 'CommentsCtrl', templateUrl: '/app/templates/comments/index.html'})
      .when('/posts/:id/comments/new', {controller: 'NewCommentCtrl', templateUrl: '/app/templates/comments/form.html'})
      .when('/posts/:post/comments/:id/edit', {controller: 'EditCommentCtrl', templateUrl: '/app/templates/comments/form.html'});
      
    $locationProvider.html5Mode(true);
  })
  .constant('fburl', 'https://code10k.firebaseio.com')
  .run(function($rootScope, angularFireAuth, fburl) {
    var ref = new Firebase(fburl);
    angularFireAuth.initialize(ref, {scope: $rootScope, name: "user"});
    $rootScope.login = function() {
      angularFireAuth.login("persona");
    };
    $rootScope.logout = function() {
      angularFireAuth.logout();
    };
    // $rootScope.$on("angularFireAuth:login", function(evt, user) {
    //   console.log(user);
    // });
    $rootScope.isAuthor = function(email) {
      return $rootScope.user ? $rootScope.user.email === email : false;
    };
  });
angular.module('App')
  .controller('EditCommentCtrl', 
    function($scope, angularFire, $location, $routeParams, fburl) {
      $scope.postIndex = $routeParams.post;
      $scope.commentIndex = $routeParams.id;
      var ref = new Firebase(fburl + '/posts');
      angularFire(ref, $scope, 'posts');
      $scope.$watch('posts', function() {
        if($scope.posts) { 
          $scope.post = $scope.posts[$scope.postIndex];
          $scope.comment = $scope.post.comments[$scope.commentIndex];
        }
      });

      $scope.save = function() {
        $location.path('/posts/' + $scope.postIndex + '/comments');
      };
    }
  );
angular.module('App')
  .controller('CommentsCtrl', function($scope, angularFire, $location, $routeParams, fburl) {
    $scope.postIndex = $routeParams.id;
    var ref = new Firebase(fburl + '/posts');
    angularFire(ref, $scope, 'posts');
    $scope.$watch('posts', function() {
      if($scope.posts) { 
        $scope.post = $scope.posts[$scope.postIndex];
      }
    });
    $scope.back = function() {
      $location.path('/');
    };
  });
angular.module('App')
  .controller('NewCommentCtrl', 
    function($scope, angularFire, $location, $routeParams, md5, fburl) {
      $scope.postIndex = $routeParams.id;
      var ref = new Firebase(fburl + '/posts');
      angularFire(ref, $scope, 'posts');
      $scope.$watch('posts', function() {
        if($scope.posts) { 
          $scope.post = $scope.posts[$scope.postIndex];
          if (!$scope.post.comments) { $scope.post.comments = []; }
        }
      });

      $scope.save = function() {
        var ref = new Firebase('https://chstechnews.firebaseio.com/posts');
        angularFire(ref, $scope, 'posts');
        $scope.comment.email = $scope.user.email;
        $scope.comment.gravatar = md5.createHash($scope.user.email);
        $scope.comment.createdAt = new Date();
        $scope.post.comments.push($scope.comment);
        $location.path('/posts/' + $scope.postIndex + '/comments');
      };
    }
  );
angular.module('App')
  .controller('EditCtrl', function($scope, angularFire, $location, $routeParams, fburl) {
    var index = $routeParams.id;
    var ref = new Firebase(fburl + '/posts');
    angularFire(ref, $scope, 'posts');
    $scope.$watch('posts', function() {
      if($scope.posts) { $scope.post = $scope.posts[index]; }
    });
    $scope.save = function() {
      //$scope.posts[index] = 
      $location.path('/');
    };
  });
angular.module('App')
  .controller('MainCtrl', function($scope, angularFire, fburl) {
    var ref = new Firebase(fburl + '/posts');
    angularFire(ref, $scope, 'posts');
  });
angular.module('App')
  .controller('NewCtrl', function($scope, angularFire, 
     $location, md5, fburl) {
    console.log($scope.user);
    $scope.save = function() {
      var ref = new Firebase(fburl + '/posts');
      angularFire(ref, $scope, 'posts');
      if (!$scope.posts) { $scope.posts = {}; }
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
      $scope.post.email = $scope.user.email;
      $scope.post.createdAt = new Date();
      $scope.post.gravatar = md5.createHash($scope.user.email);
      $scope.posts[uuid] = $scope.post;
      $location.path('/');
    };
  });