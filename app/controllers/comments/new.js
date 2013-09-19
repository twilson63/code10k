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