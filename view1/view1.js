'use strict';

angular.module('myApp.view1', ['ngRoute'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view1', {
//     templateUrl: 'view1/view1.html',
//     controller: 'View1Ctrl'
//   });
// }])

.controller('View1Ctrl', ['$scope', function($scope) {
    console.log("controller from view1");
    // var provider = new firebase.auth.GoogleAuthProvider();

    // $scope.login = function() {
    //     firebase.auth().signInWithPopup(provider).then(function(result) {
    //         // This gives you a Google Access Token. You can use it to access the Google API.
    //         var token = result.credential.accessToken;
    //
    //         // The signed-in user info.
    //         $scope.user = result.user;
    //         $scope.apply();
    //
    //         console.log(token);
    //         console.log($scope.user.displayName);
    //
    //         console.log("successful login!");
    //     }).catch(function(error) {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //
    //         // The email of the user's account used.
    //         var email = error.email;
    //
    //         // The firebase.auth.AuthCredential type that was used.
    //         var credential = error.credential;
    //
    //         console.log("fail login");
    //         console.log(errorCode);
    //         console.log(errorMessage);
    //         console.log(email);
    //         console.log(credential);
    //     });
    // };
    //
    // $scope.logout = function() {
    //     firebase.auth().signOut().then(function() {
    //         // Sign-out successful.
    //         console.log("successful sign out!");
    //     }).catch(function(error) {
    //         // An error happened.
    //         console.log("error on sign out?");
    //
    //     });
    // };
}]);