Blog.service('AuthService', AuthService = function($q, localStorageService, Session) {

    this.login = function(credentials) {
        var me = this;
        deferred = $q.defer()
        Session.create(credentials, true).then(function(user) {
            me.setToken(credentials);
            return deferred.resolve(user);
        }, function(response) {
            if (response.status == 401) {
                return deferred.reject(false);
            }
            throw new Error('No handler for status code ' + response.status);
        });
        return deferred.promise
    };

    this.logout = function() {
        localStorageService.clearAll();
    };

    this.isAuthenticated = function() {
        var token = this.getToken();
        if (token) {
            return true
        }
        return false;
    };

    this.setToken = function(credentials) {
        localStorageService.set('token', btoa(credentials.email + ':' + credentials.password));
    };

    this.getToken = function() {
        return localStorageService.get('token');
    };

    return this;
});
