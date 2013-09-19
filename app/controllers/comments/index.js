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