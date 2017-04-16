describe("Unit Tests: register", function () {
    window.MockFirebase.override();
    var firebaseRef, scope;
    beforeEach(function () {
        module("webApp")
            //import * as firebase from 'firebase';
        inject(function ($rootScope, $controller, $firebaseArray, $location, CommonProp) {
            scope = $rootScope.$new();

            $controller("RegisterCtrl", {
                $scope: scope,
                $firebaseArray: $firebaseArray

            });
            firebaseRef = firebase.database().ref().child('Contractors');
        });
    });
    it("signUp should be registered correctly", function () {
        spyOn(scope, 'signUp').and.callThrough();

        scope.$digest();
        expect(typeof (scope.signUp)).toBe('function');
    });


});
