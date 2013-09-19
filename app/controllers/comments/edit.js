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