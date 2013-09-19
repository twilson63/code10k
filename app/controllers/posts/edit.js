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