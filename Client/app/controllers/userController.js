(function () {
    'use strict';

    angular.module('app')
        .controller('userController', ['$scope', '$filter','dataService', '$uibModal', function ($scope, $filter, dataService, $uibModal) {
            $scope.users = [];
            $scope.currentPage = 1;
            $scope.itemsPerPage = 5;

            getData();

            function getData() {
                dataService.getUsers().then(function (result) {
                    $scope.$watch('searchText', function (term) {
                        $scope.users = $filter('filter')(result, term);
                    });
                });
            };

             $scope.sortBy = function (column) {
                $scope.sortColumn = column;
                $scope.reverse = !$scope.reverse;
            }



            $scope.confirmDelete = function (user) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'deleteModal.html',
                    controller: 'deleteModalController',
                    resolve: {
                        user: function () {
                            return user;
                    }
                }
        });

            modalInstance.result.then(function () {
                $scope.deleteUser(user.id);
        });
    };


            $scope.deleteUser = function (id) {
                dataService.deleteUserById(id).then(function () {
                    toastr.success('User deleted successfully');
                    getData();
                }, function () {
                    toastr.error('Error in deleting user with Id: ' + id);
                });
            };


        }])
        .controller('userAddController', ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {
            $scope.createUser = function (user) {
                dataService.addUser(user).then(function () {
                    toastr.success('User created successfully');
                    $location.path('/');
                }, function () {
                    toastr.error('Error in creating user');
                });
            };
        }])
        .controller('userEditController', ['$scope', '$routeParams', '$location', 'dataService', function ($scope, $routeParams, $location, dataService) {
            $scope.user = {};
            $scope.states = {
                showUpdateButton: false
            };

            dataService.getUserById($routeParams.id).then(function (result) {
                $scope.user = result;
                $scope.states.showUpdateButton = true;
            }, function() {
                toastr.error('Error in fetching user with Id: ' + $routeParams.id);
            });

            $scope.updateUser = function (user) {
                dataService.editUser(user).then(function () {
                    toastr.success('User updated succesfully');
                    $location.path('/');
                }, function () {
                    toastr.error('Error in updating user');
                });
            };

        }])
        //Confirm delete
        .controller('deleteModalController', ['$scope', '$uibModalInstance', 'user', function ($scope, $uibModalInstance, user) {
            $scope.user = user;

            $scope.ok = function () {
                $uibModalInstance.close();
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
    }]);

})();

