Blog.factory('User', function(Restangular) {
    var User;
    User = {
        create: function(user) {
            return Restangular
                .one('users')
                .customPOST(user);
        }
    };
    return User;
})