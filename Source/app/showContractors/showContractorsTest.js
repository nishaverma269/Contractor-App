describe("Unit Tests: showContractors", function () {
    window.MockFirebase.override();
    var firebaseRef, scope;
    beforeEach(function () {
        module("webApp")
            //import * as firebase from 'firebase';
        inject(function ($rootScope, $controller, $firebaseArray, $location, CommonProp) {
            scope = $rootScope.$new();

            $controller("showContractorsCtrl", {
                $scope: scope,
                $firebaseArray: $firebaseArray

            });
            firebaseRef = firebase.database().ref().child('Contractors');
        });
    });
    it("editContractor should be registered correctly", function () {
        spyOn(scope, 'editContractor').and.callThrough();
        scope.$digest();
        expect(typeof (scope.editContractor)).toBe('function');
    });
    it("updateContractor should be registered correctly", function () {
        spyOn(scope, 'updateContractor').and.callThrough();
        scope.$digest();
        expect(typeof (scope.updateContractor)).toBe('function');
    });
    it("deleteCnf should be registered correctly", function () {
        spyOn(scope, 'deleteCnf').and.callThrough();
        scope.$digest();
        expect(typeof (scope.deleteCnf)).toBe('function');
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
    it("showContractors should read data from firebase from Company node", function () {
        //save some data that our controller will read
        firebaseRef = firebase.database().ref().child('Company');
        var company = {
            "company": "Meijer"
        };
        firebaseRef.push(company);
        scope.$digest();
        expect(scope.companies[0].company).toEqual(company.company);
    });
    it("showContractors should read data from firebase from Contractors node", function () {
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
        expect(scope.contractors[0].name).toEqual(contractor.name);
    });

});//jkljlkkj;asdfasdafdsf