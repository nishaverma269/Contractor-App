describe("Unit Tests: home", function () {
    window.MockFirebase.override();
    var firebaseRef, scope;
    beforeEach(function () {
        module("webApp")
            //import * as firebase from 'firebase';
        inject(function ($rootScope, $controller, $firebaseArray, $location, CommonProp) {
            scope = $rootScope.$new();

            $controller("HomeCtrl", {
                $scope: scope,
                $firebaseArray: $firebaseArray

            });

        });
    });
    it("logout should be registered correctly", function () {
        spyOn(scope, 'logout').and.callThrough();

        scope.$digest();
        expect(typeof (scope.logout)).toBe('function');
    });
    it("home should read data from firebase from LogInformation node", function () {
        //save some data that our controller will read
        firebaseRef = firebase.database().ref().child('LogInformation');
        var logInformation = {
            "name": "Cam",
            "logStatus": 0

        };
        firebaseRef.push(logInformation);
        scope.$digest();
        expect(scope.contractors[0].name).toEqual(logInformation.name);
    });
    it("home should read data from firebase from Contractors node", function () {
        //save some data that our controller will read
        firebaseRef = firebase.database().ref().child('Contractors');
        var contractor = {
            "name": "Cam",
            "company": "Meijer",
            "logStatus": 0,
            "pin": 9000

        };
        firebaseRef.push(contractor);
        scope.$digest();
        expect(scope.contractorsTraining[0].name).toEqual(contractor.name);
    });


});