describe("Unit Tests: contractorAdmin", function () {
    window.MockFirebase.override();
    var firebaseRef, scope;
    beforeEach(function () {
        module("webApp")
            //import * as firebase from 'firebase';
        inject(function ($rootScope, $controller, $firebaseArray, $location, CommonProp) {
            scope = $rootScope.$new();

            $controller("AdminCtrl", {
                $scope: scope,
                $firebaseArray: $firebaseArray

            });
            firebaseRef = firebase.database().ref().child('Company');
        });
    });
    it("signIn should be registered correctly", function () {
        spyOn(scope, 'signIn').and.callThrough();

        scope.$digest();
        expect(typeof (scope.signIn)).toBe('function');
    });
    it("signIn should be called correctly", function () {
        scope.user = {
            email: "cameron.m.simon@wmich.edu",
            password: "123"
        };
        spyOn(scope, 'signIn').and.callThrough();
        scope.$digest();
        scope.signIn();
        expect(scope.signIn).toHaveBeenCalled();

    });
});
