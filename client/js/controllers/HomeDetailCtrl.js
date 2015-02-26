Blog.controller('HomeDetailCtrl', function($scope, Post) {
    Post.get().then(function(posts) {
        $scope.posts = posts;
    });
})