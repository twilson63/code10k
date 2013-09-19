angular.module('App')
  .controller('MainCtrl', function($scope, angularFire, fburl) {
    $scope.posts = {};
    var ref = new Firebase(fburl + '/posts');
    angularFire(ref, $scope, 'posts');
  });