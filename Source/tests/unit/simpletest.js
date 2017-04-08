describe('Testing', function () {
    describe('Testing title', function () {
        it('It should return the correct title', function () {
            module('webApp');
            var scope = {};
            var ctrl;
            inject(function ($controller) {
                ctrl = $controller('app', {
                    $scope: scope
                });
            });
            expect(scope.title).toBeDefined();
            expect(scope.title).toBe("My AngularJS App");
        });
    });
});