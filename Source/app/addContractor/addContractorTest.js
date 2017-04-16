describe("Unit Tests: addContractor", function () {
    window.MockFirebase.override();

    var firebaseRef, scope;
    beforeEach(function () {
        module("webApp")
        inject(function ($rootScope, $controller, $firebaseArray, $location, CommonProp) {
            scope = $rootScope.$new();

            $controller("addContractorCtrl", {
                $scope: scope,
                $firebaseArray: $firebaseArray
            });
            firebaseRef = firebase.database().ref().child('Contractors');


        });
    });
    it("createContractor should be registered correctly", function () {

        spyOn(scope, 'createContractor').and.callThrough();
        scope.$digest();
        expect(typeof (scope.createContractor)).toBe('function');
    });
    it("logout should be registered correctly", function () {

        spyOn(scope, 'logout').and.callThrough();
        scope.$digest();
        expect(typeof (scope.logout)).toBe('function');
    });
    it("addContractorCtrl should read data from firebase from Company node", function () {
        //save some data that our controller will read
        firebaseRef = firebase.database().ref().child('Company');
        var company = {
            "company": "Meijer"
        };
        firebaseRef.push(company);
        scope.$digest();
        expect(scope.companies[0].company).toEqual(company.company);
    });
    it("addContractorCtrl should read data from firebase from Contractors node", function () {
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
        expect(scope.contractor[0].name).toEqual(contractor.name);
    });
    /*
        Cannot mock snapshot() in addContractor unless testing based on a 
        node...
    */
    /*
    it("A contractor should be added to Contractors node", function () {
        
        spyOn(scope, 'createContractor').and.callThrough();
        spyOn(scope.contractor,'$add').and.callThrough();
        firebaseRef = firebase.database().ref().child('Contractors');
        var contractor = {
            "name": "Cam",
            "company": "Meijer",
            "logStatus": 0,
            "pin": 9000

        };
        firebaseRef.push(contractor);
        scope.contractor.name = "Cam";
        scope.contractor.company = "Meijer";
        scope.contractor.pin = 992;
        scope.$digest();
        scope.createContractor();
        expect(scope.contractor.$add).toHaveBeenCalled();
    });
    
    */
});