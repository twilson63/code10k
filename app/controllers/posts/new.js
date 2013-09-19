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