'use strict';
angular.module('webApp.contractorAdmin', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/contractorAdmin', {
        templateUrl: 'contractorAdmin/contractorAdmin.html',
        controller: 'AdminCtrl'
    });
}]).controller('AdminCtrl', ['$scope', '$firebaseAuth', '$location', 'CommonProp','$timeout', function ($scope, $firebaseAuth, $location, CommonProp,$timeout) {
    /*
        AdminCtrl involves the logic with logging in an admin. 
    */

    /*
        Signin method to sign in Admin using information from the model. 
    */
    /*
        Used to show if the admin had the wrong username and password
    */
    $scope.incorrectLoginMessage = "Incorrect credentials. Please try again."
    $scope.loginAlertMessage = false;
    $scope.signIn = function () {
            var username = $scope.user.email;
            var password = $scope.user.password;
            var auth = $firebaseAuth();
            auth.$signInWithEmailAndPassword(username, password).then(function () {
                console.log("User Login Successful");
                CommonProp.setUser($scope.user.email);
                $location.path('/home');
            }).catch(function (error) {
                $scope.errMsg = true;
                $scope.errorMessage = error.message;
                $scope.loginAlertMessage = true;
                $timeout(function () { $scope.loginAlertMessage = false; }, 3000); 
            });
        }
        /* 
            This is used to logout Admin from the system
        */
    $scope.logout = function () {
        CommonProp.logoutUser();
    }
}]).service('CommonProp', ['$location', '$firebaseAuth', function ($location, $firebaseAuth) {
    /*
    CommonProp holds information on the current logged in user and allows for getting the current user's information, setting the current user when appropriate and logging out the user. 
    */
    var user = "";
    var auth = $firebaseAuth();
    return {
        getUser: function () {
            if (user == "") {
                user = localStorage.getItem("userEmail");
            }
            return user;
        },
        setUser: function (value) {
            localStorage.setItem("userEmail", value);
            user = value;
        },
        logoutUser: function () {
            auth.$signOut();
            console.log("Logged Out Succesfully");
            user = "";
            localStorage.removeItem('userEmail');
            $location.path('/contractorAdmin');
        }
    };
}]);