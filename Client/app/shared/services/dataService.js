(function () {
    'use strict';

    angular.module('app').factory('dataService', ['$http', '$q', function($http, $q) {
        var service = {};
        var urlBase = "https://localhost:7296/api/Users";
        

        service.getUsers = function() {
            var deferred = $q.defer();
            $http.get(`${urlBase}/GetAll`).then(function (result) { //$http.get('https://localhost:7296/api/Users/GetAll')
                deferred.resolve(result.data);
            }, function(){
                deferred.reject();
            });

            return deferred.promise;
        };

        service.getUserById = function(id) {
            var deferred = $q.defer();
            $http.get(`${urlBase}/GetById/` + id).then(function (result) { //$http.get('https://localhost:7296/api/Users/GetById/' + id)
                deferred.resolve(result.data);
            }, function(){
                deferred.reject();
            });

            return deferred.promise;
        };

        service.addUser = function(user) {
            var deferred = $q.defer();
            $http.post(`${urlBase}/Create`, user).then(function() { // $http.post('https://localhost:7296/api/Users/Create', user
                deferred.resolve();
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        };

        service.editUser = function(user) {
                var deferred = $q.defer();
                $http.put(`${urlBase}/Edit/`, user).then(function() { //$http.put('https://localhost:7296/api/Users/Edit/', user)
                    deferred.resolve();
                }, function() {
                    deferred.reject();
                });

                return deferred.promise;
        };

        service.deleteUserById = function(id) {
                var deferred = $q.defer();
                $http.delete(`${urlBase}/Delete/${id}`).then(function() {
                    deferred.resolve();
                }, function() {
                    deferred.reject();
                });

                return deferred.promise;
        };

        return service;

    }]);

})();