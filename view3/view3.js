'use strict';

angular.module('myApp.view3', ['ngRoute'])

.controller('View3Ctrl', ['$scope', function($scope) {
    console.log("controller from view3  ");

    /* Most of the functionality is embedded within index controller */
    // $scope.eventDetails = function(event) {
    //     console.log("from view3:");
    //     console.log(event);
    // }
    //
    // $scope.view3Func = function() {
    //     alert('hello world');
    // }
}]);