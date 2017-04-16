describe("Unit Tests: Add Company", function () {
    window.MockFirebase.override();

    var firebaseRef, scope;
    beforeEach(function () {
        module("webApp")
            //import * as firebase from 'firebase';
        inject(function ($rootScope, $controller, $firebaseArray, $location, CommonProp) {
            scope = $rootScope.$new();

            $controller("AddCompanyCtrl", {
                $scope: scope,
                $firebaseArray: $firebaseArray

            });
            firebaseRef = firebase.database().ref().child('Company');
        });
    });
    it("createCompany should be registered correctly", function () {
        scope.company = "Company";

        spyOn(scope, 'createCompany').and.callThrough();
        scope.$digest();
        scope.createCompany();
        expect(typeof (scope.createCompany)).toBe('function');
    });
    it("createCompany should be called correctly", function () {
        scope.company = "Company";

        spyOn(scope, 'createCompany').and.callThrough();
        scope.$digest();
        scope.createCompany();
        expect(typeof (scope.createCompany)).toBe('function');
        expect(scope.createCompany).toHaveBeenCalled();

    });
    it("AddCompanyCtrl should read data from firebase", function () {
        //save some data that our controller will read
        var company = {
            "company": "Meijer"
        };
        firebaseRef.push(company);
        scope.$digest();
        expect(scope.companies[0].company).toEqual(company.company);
    });
    it("A company should be added to companies", function () {
        scope.company = "Company";
        spyOn(scope, 'createCompany').and.callThrough();
        spyOn(scope.companies, '$add').and.callThrough()
        scope.$digest();
        scope.createCompany();
        expect(scope.companies.$add).toHaveBeenCalled();

    });

});
