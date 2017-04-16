describe("Unit Tests: adminSettings", function () {
    window.MockFirebase.override();

    var firebaseRef, scope;
    beforeEach(function () {
        module("webApp");
        module("firebase");
        inject(function ($rootScope, $controller, $firebaseArray, $location, $firebaseAuth, CommonProp) {
            scope = $rootScope.$new();
            var auth = $firebaseAuth();
            $controller("adminSettingsCtrl", {
                $scope: scope,
                $firebaseArray: $firebaseArray

            });
        });
    });

    it("updateAdmin should be registered correctly", function () {
        spyOn(scope, 'updateAdmin').and.callThrough();
        scope.$digest();
        expect(typeof (scope.updateAdmin)).toBe('function');
    });
    it("finalizeDelete should be registered correctly", function () {
        spyOn(scope, 'finalizeDelete').and.callThrough();
        scope.$digest();
        expect(typeof (scope.finalizeDelete)).toBe('function');
    });
    it("logout should be registered correctly", function () {
        spyOn(scope, 'logout').and.callThrough();
        scope.$digest();
        expect(typeof (scope.logout)).toBe('function');
    });

});
