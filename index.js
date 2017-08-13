'use strict';

angular.module('myApp.index', ['ngRoute'])

    .controller('IndexCtrl', ['$scope', function($scope) {
    var provider = new firebase.auth.GoogleAuthProvider();

    $scope.displayLogin = true;


    /* Observer function */
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user);

            $scope.user = user;
            $scope.displayLogin = false;
            $scope.$apply();

            var usersRef = firebase.database().ref('users');

            usersRef.child(user.uid).once('value', function(snapshot) {
                var exists = (snapshot.val() !== null);

                if (!exists) {
                    console.log("User does not exist. Creating User...");
                    $scope.addUser(user.uid, user.displayName, user.email);
                }

                $scope.getUser(user.uid);
                $scope.$apply();
            });

        } else {
            console.log("No user logged in.");

            $scope.displayLogin = true;
            $scope.user = null;
            $scope.userDB = null;
            $scope.$apply();
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
            console.log(snapshot.val());

            $scope.userDB = snapshot.val();
            $scope.$apply();
        }, function (error) {
            console.log("Error: " + error.code);
            console.log(error);
        });
    };

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
            console.log("successful sign out!");

        }).catch(function(error) {
            // An error happened.
            console.log("error on sign out?");

        });
    };
}]);