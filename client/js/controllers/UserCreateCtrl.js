Blog.controller('UserCreateCtrl', function($scope, User) {

    var defaultForm = {
        email: '',
        password: '',
        passwordConfirmation: ''
    };

    $scope.user = angular.copy(defaultForm);

    $scope.submit = function(isValid, user) {
        $scope.submitted = true;
        $scope.accountCreated = false;

        $scope.userCreateForm.$setDirty();

        if (!isValid) {
            return;
        }

        User.create(user).then(function(response) {
            $scope.accountCreated = true;

            // reset form
            $scope.submitted = false;
            $scope.user = angular.copy(defaultForm);
            $scope.userCreateForm.$setPristine();
        });
    };
})