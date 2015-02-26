Blog.controller('SessionCreateCtrl', function($scope, $location, Session, AuthService) {
    $scope.submit = function(isValid, credentials) {
        $scope.submitted = true;
        $scope.authenticationForm.$setDirty();

        if (!isValid) {
            return;
        }

        AuthService.login(credentials).then(function(user) {
            $location.path('/posts/create')
        }, function(response) {
            $scope.failedLoginAttempt = true;
        });
    };
})