'use strict';

angular.module('myApp.index', ['ngRoute'])

    .controller('IndexCtrl', ['$scope', '$timeout', '$window', function($scope, $timeout, $window) {
    var provider = new firebase.auth.GoogleAuthProvider();

    $scope.displayLogin = true;
    $scope.creating = false;
    $scope.departments = ['External', 'Internal', 'EDP', 'Marketing',
        'Social', 'Treasury', 'Technology', 'Mentorship'];

    /* Observer function */
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user);

            $timeout(function() {
                $scope.user = user;
                $scope.displayLogin = false;
            }, 0);

            var usersRef = firebase.database().ref('users');

            usersRef.child(user.uid).once('value', function(snapshot) {
                if (!snapshot.exists()) {
                    console.log("User does not exist. Creating User...");
                    $scope.addUser(user.uid, user.displayName, user.email);
                }

                $scope.getUser(user.uid);

            });

        } else {
            console.log("No user logged in.");

            $timeout(function() {
                $scope.displayLogin = true;
                $scope.user = null;
                $scope.userDB = null;
                $window.location.href = '#!'
            }, 0);
        }
    });

    /* Create new user */
    $scope.addUser = function(userId, name, email) {
        firebase.database().ref('users/' + userId).set({
            username: name,
            email: email,
            attended: ['NULL'],
            excused: ['NULL']
        });
    };

    /* Display User data and transfer to Angular */
    $scope.getUser = function(userId) {
        firebase.database().ref('users/' + userId).once("value", function(snapshot) {
            $timeout(function() {
                $scope.userDB = snapshot.val();
                // $scope.getEvents();

                firebase.database().ref('events').on('value', function(snapshot) {
                    console.log("received events");
                    $timeout(function() {
                        $scope.events = snapshot.val();
                        console.log($scope.events);
                    }, 0);

                    // $scope.$apply();
                });
            }, 0);//
            // .then($scope.getEvents);

        }, function (error) {
            console.log("Error: " + error.code);
            console.log(error);
        });
    };

    /* Front-end functions */
    $scope.login = function() {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;

            // The signed-in user info.
            var user = result.user;


        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            // The email of the user's account used.
            var email = error.email;

            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            console.log("Login failure:");
            console.log(errorCode);
            console.log(errorMessage);
        });
    };

    $scope.logout = function() {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("User sign out!");

        }).catch(function(error) {
            // An error happened.
            console.log("Error on sign out.");

        });
    };

    /***** EVENT PAGE FUNCTIONS *****/
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
    // $scope.getEvents = function() {
    //     firebase.database().ref('events').on('value', function(snapshot) {
    //         console.log("received events");
    //         $timeout(function() {
    //             $scope.events = snapshot.val();
    //             console.log($scope.events);
    //         }, 0);
    //
    //         // $scope.$apply();
    //     });
    //
    //
    // };

    /* Boolean flipper */
    $scope.flipState = function() {
        $scope.creating = !$scope.creating;
    }

}]);