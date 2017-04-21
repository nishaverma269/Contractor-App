'use strict';
angular.module('webApp.contractorLogin', ['ngRoute', 'angularMoment', 'firebase', 'ui.bootstrap']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/contractorLogin', {
        templateUrl: 'contractorLogin/contractorLogin.html',
        controller: 'contractorLoginCtrl'
    });
    }]).controller('contractorLoginCtrl', ['$scope', '$filter', '$uibModal', 'CommonProp', 'moment', '$firebaseArray', '$firebaseObject', '$location', function ($scope, $filter, $uibModal, CommonProp, moment, $firebaseArray, $firebaseObject, $location) {
    /*
        contractorLoginCtrl helps with the logic of logging in a contractor. A different modal will be displayed based on 
        the status of the contractor. If the contractor is not updated on their safety training in the last 12 months, they will
        not be allowed to log in. 
    */
    $scope.loginPin = "";
    $scope.logoutPin = "";
    $scope.show = 0;
    /*
        contractorLogin checks to see if the contractor is in the system based on their pin.
        If they are not, a modal will pop up to tell them. 
        If they are, a modal will pop up to finish the login. 
    */
    $scope.contractorLogin = function () {
        var ref = firebase.database().ref();
        ref.child('Contractors').orderByChild("pin").equalTo($scope.loginPin).once("value", function (snapshot) {
            var userData = snapshot.val();
            // If the pin is correct...
            if (userData) {
                snapshot.forEach(function (childSnapshot) {
                    var value = childSnapshot.val();
                    $scope.name = value.name;
                    $scope.company = value.company;
                   
                });
                // Used to open up modal.
                 var modalInstance = $uibModal.open({
                        component: 'myModal',
                        controller: "contractorLoginCtrl",
                        scope: $scope //passed current scope to the modal
                    });
                $("#loginConfirmModal").modal('show');
            } else {
                //Shown if the pin does not show in the system. 
                $("#wrongPINModal").modal('show');
            }
        });
    };
    /* 
        contractorLogout first checks to see if the contractor is in the system based on their pin. 
        If they are not, a modal will pop up to tell them.
        If they are, a modal will pop up to finish the logout. 
    */
    $scope.contractorLogout = function () {
        var ref = firebase.database().ref();
        ref.child('Contractors').orderByChild("pin").equalTo($scope.logoutPin).once("value", function (snapshot) {
            var userData = snapshot.val();
            // If the pin is correct...
            if (userData) {
                snapshot.forEach(function (childSnapshot) {
                    var value = childSnapshot.val();
                    $scope.name = value.name;
                    $scope.company = value.company;
                    var modalInstance = $uibModal.open({
                        component: 'myModal',
                        controller: "contractorLoginCtrl",
                        scope: $scope //passed current scope to the modal
                    });
                });
                // Used to open modal.
                 var modalInstance = $uibModal.open({
                        component: 'myModal',
                        controller: "contractorLoginCtrl",
                        scope: $scope //passed current scope to the modal
                    });
                $("#logoutConfirmModal").modal('show');
            } else {
                //Shown if the pin does not exist in the system. 
                $("#wrongPINModal").modal('show');
            }
        });
    };
    /* 
        loginConfirmed will finish the login process. 
        If they user is already logged in, it will not allow them to complete the login process.
        If the user needs to update their safety training, it will not allow them to complete the login process.
        If the user is not logged in and safety training is good, the contractor is logged in and a entry to the 
        LogInformation node will be made in Firebase
    */
    $scope.loginConfirmed = function () {
        var logInformation;
        var logoutTime = $filter('date')(new Date(), 'shortTime');
        var currentDate = new Date();
        var momentDate = moment(currentDate, 'MM/DD/YYYY');
        console.log(momentDate.day() + " day " + momentDate.year() + " year ");
        var loginTime = $filter('date')(new Date(), 'shortTime');
        var logOutTime = "00-00";
        var ref = firebase.database().ref().child('LogInformation');
        logInformation = $firebaseArray(ref);
        var ref = firebase.database().ref();
        ref.child("Contractors").orderByChild("pin").equalTo($scope.loginPin).once("value", function (snapshot) {
            var userData = snapshot.val();
            // If the user is in the system... 
            if (userData) {
                var rootRef = firebase.database().ref().child('Contractors');
                var filterRef;
                filterRef = rootRef.orderByChild('pin').equalTo($scope.loginPin);
                $scope.contractors = $firebaseArray(filterRef);
                $scope.contractors.$loaded().then(function () {
                    var updateRef = firebase.database().ref().child('Contractors/' + $scope.contractors[0].$id);
                    if ($scope.contractors[0].logStatus == 1) {
                        $("#loginConfirmModal").modal('hide');
                        $("#alreadyLoggedInModal").modal('show');
                    } else if (momentDate.isSame(moment($scope.contractors[0].date).add(1, 'years'), 'day')) {
                        $("#loginConfirmModal").modal('hide');
                        $("#safetyTrainingModal").modal('show');
                    } else if (momentDate.isAfter(moment($scope.contractors[0].date).add(1, 'years'), 'day')) {
                        $("#loginConfirmModal").modal('hide');
                        $("#safetyTrainingModal").modal('show');
                    } else {
                        updateRef.update({
                            logStatus: 1
                        }).then(function (ref) {
                            $scope.$apply(function () {
                                $("#loginConfirmModal").modal('hide');
                            });
                        }, function (error) {
                            console.log(error);
                        });
                        $("#loggedInModal").modal('show');
                        logInformation.$add({
                            name: $scope.contractors[0].name,
                            company: $scope.contractors[0].company,
                            pin: $scope.contractors[0].pin,
                            loginTime: loginTime,
                            logOutTime: logOutTime,
                            currentLoginStatus: 1,
                            totalHours: 0,
                            date: $filter('date')(new Date(), 'MM/dd/yyyy')
                        });
                    }

                });
                $scope.loginPin = "";
                //console.log($scope.contractors.name);
            }
        });
    };
    /*
      logoutConfirmed will finish the logout process. 
        If they user is already logged out, it will not allow them to complete the logout process.
        If the user is not logged out and the contractor is logged out and a entry to the 
        LogInformation node will be made in Firebase
    */
    $scope.logoutConfirmed = function () {
        var ref = firebase.database().ref();
        ref.child("Contractors").orderByChild("pin").equalTo($scope.logoutPin).once("value", function (snapshot) {
            var userData = snapshot.val();
            if (userData) {
                var rootRefCon = firebase.database().ref().child('Contractors');
                var filterRefCon;
                filterRefCon = rootRefCon.orderByChild('pin').equalTo($scope.logoutPin);
                $scope.contractors = $firebaseArray(filterRefCon);
                $scope.contractors.$loaded().then(function () {

                    var updateRef = firebase.database().ref().child('Contractors/' + $scope.contractors[0].$id);
                    if ($scope.contractors[0].logStatus == 0) {
                        $("#logoutConfirmModal").modal('hide');
                        $("#alreadyLoggedOutModal").modal('show');
                    } else {
                        updateRef.update({
                            logStatus: 0
                        }).then(function (ref) {
                            $scope.$apply(function () {
                                $("#logoutConfirmModal").modal('hide');
                            });
                        }, function (error) {
                            console.log(error);
                        });
                        $("#loggedOutModal").modal('show');
                        var rootRefLog = firebase.database().ref().child('LogInformation');
                        var filterRefLog = rootRefLog.orderByChild('pin').equalTo($scope.contractors[0].pin);
                        $scope.logInformation = $firebaseArray(filterRefLog);
                        $scope.logInformation.$loaded().then(function () {
                            angular.forEach($scope.logInformation, function (logStatuses) {
                                if (logStatuses.currentLoginStatus == 1) {
                                    var logoutTime = $filter('date')(new Date(), 'shortTime');
                                    var startTime = moment(logStatuses.loginTime, "HH:mm a");
                                    var endTime = moment(logoutTime, "HH:mm a");
                                    var duration = moment.duration(endTime.diff(startTime));
                                    var hours = parseInt(duration.asHours());
                                    var minutes = parseInt(duration.asMinutes()) - hours * 60;
                                    var totalHours = hours + 'hr ' + minutes + 'min';
                                    var updateRefLog = firebase.database().ref().child('LogInformation/' + logStatuses.$id);
                                    updateRefLog.update({
                                        currentLoginStatus: 0,
                                        logOutTime: logoutTime,
                                        totalHours: totalHours
                                    }).then(function (ref) {}, function (error) {
                                        console.log(error);
                                    });
                                }
                            })
                        });
                    }

                });
                $scope.logoutPin = "";
            }
        });
    };
}]);