Blog.controller('ApplicationCtrl', function($scope, $location, Post, AuthService) {
    $scope.$on('$routeChangeStart', function (event, next) {
        if (AuthService.isAuthenticated()) {
            $scope.isLoggedIn = true;
        } else {
            $scope.isLoggedIn = false;
        }
    });

    $scope.isActive = function(path) {
        if ($location.path().substr(0, path.length) === path) {
            if (path === "/" && $location.path() === "/") {
                return true;
            } else if (path === "/") {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    };
})