/*
    Needed in order to use AngularFire and Firebase functions in test
*/

describe("Unit Tests: welcome", function () {
    window.MockFirebase.override();
    var firebaseRef, scope;
    beforeEach(function () {
        module("webApp")
            //import * as firebase from 'firebase';
        inject(function ($rootScope, $controller, $firebaseArray, $location, CommonProp) {
            scope = $rootScope.$new();

            $controller("WelcomeCtrl", {
                $scope: scope,
                $firebaseArray: $firebaseArray

            });
            firebaseRef = firebase.database().ref().child('Contractors');
        });
    });
    it("date object should be defined", function () {
        scope.$digest();
        expect(scope.date).toBeDefined();
    });
    it("date object should be the current day", function () {
        var currentDate = new Date();
        scope.$digest();
        expect(scope.date.getDay).toEqual(currentDate.getDay);
    });


});