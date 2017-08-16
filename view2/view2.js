'use strict';

angular.module('myApp.view2', ['ngRoute'])

.controller('View2Ctrl',  ['$scope', function($scope) {
    console.log("controller from view2");

    // var provider = new firebase.auth.GoogleAuthProvider();
    $scope.creating = false;
    $scope.departments = ['External', 'Internal', 'EDP', 'Marketing',
        'Social', 'Treasury', 'Technology', 'Mentorship'];

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("view2 sees a user!");

            $scope.user = user;
            // $scope.$apply();

            var usersRef = firebase.database().ref('users');

            usersRef.child(user.uid).once('value', function(snapshot) {

                if (snapshot.exists()) {
                    $scope.getEvents();
                }
            });

        } else {
            console.log("view2 does not see a user!");
            $scope.events = null;
            $scope.user = null;

            // $scope.$apply();
        }
    });

    $scope.createEvent = function(name, dept) {
        if (!name || !dept) {
            alert("Error: Must provide event name and department.");
            return;
        }

        if ($scope.userDB.admin) {
            firebase.database().ref('events').push({
                name: name,
                dept: dept,
                date: firebase.database.ServerValue.TIMESTAMP,
                attendees: ['NULL'],
                excused: ['NULL']
            });
        }

    };

    /* Set up listener but also allow manual trigger through function invocation */
    $scope.getEvents = function() {
        firebase.database().ref('events').on('value', function(snapshot) {
            $scope.events = snapshot.val();
            // $scope.$apply();
        })
    };

    /* Boolean flipper */
    $scope.flipState = function() {
        $scope.creating = !$scope.creating;
    }
}]);