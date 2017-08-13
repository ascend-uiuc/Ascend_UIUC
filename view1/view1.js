'use strict';

angular.module('myApp.view1', ['ngRoute'])

.controller('View1Ctrl', ['$scope', function($scope) {
    console.log("controller from view1");

}]);