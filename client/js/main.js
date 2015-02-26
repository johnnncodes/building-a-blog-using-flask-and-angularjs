window.Blog = angular.module('Blog', ['ngRoute', 'restangular', 'LocalStorageModule'])

.run(function($location, Restangular, AuthService) {
    Restangular.setFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
        if (AuthService.isAuthenticated()) {
            headers['Authorization'] = 'Basic ' + AuthService.getToken();
        }
        return {
            headers: headers
        };
    });

    Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
        if (response.config.bypassErrorInterceptor) {
            return true;
        } else {
            switch (response.status) {
                case 401:
                    AuthService.logout();
                    $location.path('/sessions/create');
                    break;
                default:
                    throw new Error('No handler for status code ' + response.status);
            }
            return false;
        }
    });
})

.config(function($routeProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('http://localhost:5000/api/v1');

    var partialsDir = '../partials';

    var redirectIfAuthenticated = function(route) {
        return function($location, $q, AuthService) {

            var deferred = $q.defer();

            if (AuthService.isAuthenticated()) {
                deferred.reject()
                $location.path(route);
            } else {
                deferred.resolve()
            }

            return deferred.promise;
        }
    }

    var redirectIfNotAuthenticated = function(route) {
        return function($location, $q, AuthService) {

            var deferred = $q.defer();

            if (! AuthService.isAuthenticated()) {
                deferred.reject()
                $location.path(route);
            } else {
                deferred.resolve()
            }

            return deferred.promise;
        }
    }

    $routeProvider
        .when('/', {
            controller: 'HomeDetailCtrl',
            templateUrl: partialsDir + '/home/detail.html'
        })
        .when('/sessions/create', {
            controller: 'SessionCreateCtrl',
            templateUrl: partialsDir + '/session/create.html',
            resolve: {
                redirectIfAuthenticated: redirectIfAuthenticated('/posts/create')
            }
        })
        .when('/sessions/destroy', {
            controller: 'SessionDestroyCtrl',
            templateUrl: partialsDir + '/session/destroy.html'
        })
        .when('/users/create', {
            controller: 'UserCreateCtrl',
            templateUrl: partialsDir + '/user/create.html'
        })
        .when('/posts/create', {
            controller: 'PostCreateCtrl',
            templateUrl: partialsDir + '/post/create.html',
            resolve: {
                redirectIfNotAuthenticated: redirectIfNotAuthenticated('/sessions/create')
            }
        });
})