(function(){
    'use strict';

    angular.module('app', ['ngRoute', 'ui.bootstrap'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider
            .when('/', {
                controller: 'userController',
                templateUrl: 'app/templates/user.html'
            })
            .when('/addUser', {
                controller: 'userAddController',
                templateUrl: 'app/templates/userAdd.html'
            })
            .when('/editUser/:id', {
                controller: 'userEditController',
                templateUrl: 'app/templates/userEdit.html'
            })
            .otherwise({ redirectTo: '/' });
    }]);

})();
