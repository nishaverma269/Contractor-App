describe("Unit Tests: reports", function () {
    window.MockFirebase.override();
    var firebaseRef, scope;
    beforeEach(function () {
        module("webApp")
            //import * as firebase from 'firebase';
        inject(function ($rootScope, $controller, $firebaseArray, $location, CommonProp) {
            scope = $rootScope.$new();

            $controller("reportsCtrl", {
                $scope: scope,
                $firebaseArray: $firebaseArray

            });
            firebaseRef = firebase.database().ref().child('Contractors');
        });
    });
    it("rangeDate should be registered correctly", function () {
        spyOn(scope, 'rangeDate').and.callThrough();

        scope.$digest();
        expect(typeof (scope.rangeDate)).toBe('function');
    });
    it("specificDate should be registered correctly", function () {
        spyOn(scope, 'specificDate').and.callThrough();

        scope.$digest();
        expect(typeof (scope.specificDate)).toBe('function');
    });
    it("logout should be registered correctly", function () {
        spyOn(scope, 'logout').and.callThrough();

        scope.$digest();
        expect(typeof (scope.logout)).toBe('function');
    });
    it("reports should read data from firebase from LogInformation node", function () {
        //save some data that our controller will read
        firebaseRef = firebase.database().ref().child('LogInformation');
        var logInformation = {
            "name": "Cam",
            "logStatus": 0,
            "date": "03/17/2017"

        };
        firebaseRef.push(logInformation);
        scope.$digest();
        expect(scope.contractors[0].name).toEqual(logInformation.name);
    });
});