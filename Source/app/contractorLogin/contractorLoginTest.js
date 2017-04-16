describe("Unit Tests: contractorLogin", function () {
    window.MockFirebase.override();
    var firebaseRef, scope;
    beforeEach(function () {
        module("webApp")
            //import * as firebase from 'firebase';
        inject(function ($rootScope, $controller, $firebaseArray, $location, CommonProp) {
            scope = $rootScope.$new();

            $controller("contractorLoginCtrl", {
                $scope: scope,
                $firebaseArray: $firebaseArray

            });
            firebaseRef = firebase.database().ref().child('Contractors');
        });
    });
    it("contractorLogin should be registered correctly", function () {
        spyOn(scope, 'contractorLogin').and.callThrough();
        scope.$digest();
        expect(typeof (scope.contractorLogin)).toBe('function');
    });
    it("contractorLogout should be registered correctly", function () {
        spyOn(scope, 'contractorLogout').and.callThrough();

        scope.$digest();
        expect(typeof (scope.contractorLogout)).toBe('function');
    });
    it("loginConfirmed should be registered correctly", function () {
        spyOn(scope, 'loginConfirmed').and.callThrough();

        scope.$digest();
        expect(typeof (scope.loginConfirmed)).toBe('function');
    });
    it("logoutConfirmed should be registered correctly", function () {
        spyOn(scope, 'logoutConfirmed').and.callThrough();

        scope.$digest();
        expect(typeof (scope.logoutConfirmed)).toBe('function');
    });

});