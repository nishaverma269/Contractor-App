//describe('Testing', function () {
//    describe('Testing title', function () {
//        it('It should return the correct title', function () {
//            module('webApp');
//            var scope = {};
//            var ctrl;
//            inject(function ($controller) {
//                ctrl = $controller('app', {
//                    $scope: scope
//                });
//            });
//            expect(scope.title).toBeDefined();
//            expect(scope.title).toBe("My AngularJS App");
//        });
//    });
//});
//describe("Unit Tests: ADD COMPANY", function () {
//    window.MockFirebase.override();
//
//    var firebaseRef, scope;
//
//    beforeEach(function () {
//        module("webApp")
//        inject(function ($rootScope, $controller, $firebaseArray) {
//            scope = $rootScope.$new();
//
//            $controller("AddCompanyCtrl", {
//                $scope: scope,
//                $firebaseArray: $firebaseArray
//            });
//
//            firebaseRef = firebase.database().ref().child('Company');
//        });
//    });
//
//    it("should save data to firebase", function () {
//        var response;
//
//        firebaseRef.on("value", function (data) {
//            response = data.val();
//        });
//
//        firebaseRef.flush();
//        scope.$digest();
//
//        var keys = Object.keys(response);
//        expect(keys.length).toEqual(1);
//    });
//});
//describe('addCalc', function () {
//    
//      beforeEach(module('webApp'));
//      var $controller;
//      beforeEach(inject(function(_$controller_){
//        $controller = _$controller_;
//      }));
//      describe('add company to database', function () {
//        it('Should add company to database', function () {
//          var $scope = {};
//          var controller = $controller('AddCompanyCtrl', { $scope: $scope });
//          $scope.company.titleTxt = "Meijer";
//          $scope.createCompany();
//          expect($scope.addedCompany ).toBe(true);
//        }); 
//      });
//    });
//describe("Good Test", function() {
//  it("contains spec with an expectation", function() {
//    expect(false).toBe(true);
//  });
//});
//describe('PasswordController', function() {
//  beforeEach(module('app'));
//
//  var $controller;
//
//  beforeEach(inject(function(_$controller_){
//    // The injector unwraps the underscores (_) from around the parameter names when matching
//    $controller = _$controller_;
//  }));
//
//  describe('$scope.grade', function() {
//    it('sets the strength to "strong" if the password length is >8 chars', function() {
//      var $scope = {};
//      var controller = $controller('PasswordController', { $scope: $scope });
//      $scope.password = 'longerthaneightchars';
//      $scope.grade();
//      expect($scope.strength).toEqual('strong');
//    });
//  });
//});
var config = {
    apiKey: "AIzaSyCbP7xsg-sFYl6DA2xximQSHN4xRtkKea0",
    authDomain: "webapp-30212.firebaseapp.com",
    databaseURL: "https://webapp-30212.firebaseio.com",
    storageBucket: "webapp-30212.appspot.com",
    messagingSenderId: "178764603350"
};
firebase.initializeApp(config);
//describe("Unit Tests:", function () {
//    window.MockFirebase.override();
//
//    var firebaseRef, scope;
//    //beforeEach(module('ngAnimateMock'));
//    beforeEach(function () {
//        module("webApp")
//        //import * as firebase from 'firebase';
//        inject(function ($rootScope, $controller, $firebaseArray,$filter,$location,CommonProp) {
//            scope = $rootScope.$new();
//
//            $controller("reportsCtrl", {
//                $scope: scope,
//                $firebaseArray: $firebaseArray
//               
//            });
//            firebaseRef = firebase.database().ref().child('LogInformation');
//        });
//    });
//    afterEach(function () {
//    jasmine.clock().uninstall();
//    });
//
//    it("should read data from firebase", function () {
//        //save some data that our controller will read
//        var currentDate = new Date();
//    
//        jasmine.clock().install();
//        var baseTime = new Date();
//        jasmine.clock().mockDate(baseTime);
//        jasmine.clock().tick(50);
//        //var momentTime = moment(baseTime,'MM/DD/YYYY');
//        var contractor = {
//               "name": "Cam",
//                "company": "Company",
//                "pin": "10",
//                "loginTime": "",
//                "logOutTime": "",
//                "totalHours": "",
//                "date": (currentDate.getMonth()+1)  + "/" + currentDate.getDate() + "/" + currentDate.getFullYear()
//        };
//        
//        spyOn( scope, 'specificDate' );
//        spyOn(scope.getArray,'push');
////        scope.getArray = [];
////        scope.date = new Date();
//        firebaseRef.push(contractor);
//        //firebase.flush();
//        scope.specificDate();
//        scope.$digest();
//        //expect(scope.getArray[0]).toBeDefined();
//        console.info(scope.contractors);
//        console.info((currentDate.getMonth()+1)  + "/" + currentDate.getDate() + "/" + currentDate.getFullYear());
//        //expect(typeof (scope.specificDate)).toBe('function');
//        expect(scope.specificDate).toHaveBeenCalled();
//        //expect(scope.getArray.push).toHaveBeenCalled();
//        scope.$digest();
//       // expect(scope.getArray[0].name).toBe("Cam");
//       // expect().toBe();
//    });
//});
describe("Unit Tests: Add Company", function () {
    window.MockFirebase.override();

    var firebaseRef, scope;
    //beforeEach(module('ngAnimateMock'));
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
    it("A company should be added to companies", function () {
        scope.company = "Company";
        spyOn(scope, 'createCompany').and.callThrough();
        spyOn(scope.companies, '$add').and.callThrough()
        scope.$digest();
        scope.createCompany();
        expect(scope.companies.$add).toHaveBeenCalled();

    });
});
describe("Unit Tests: Contractor Settings", function () {
    window.MockFirebase.override();

    var firebaseRef, scope;
    //beforeEach(module('ngAnimateMock'));
    beforeEach(function () {
        module("webApp");
        module("firebase");
        //FBAuth = _firebaseAuth_;
        //import * as firebase from 'firebase';
        inject(function ($rootScope, $controller, $firebaseArray, $location, $firebaseAuth, CommonProp) {
            scope = $rootScope.$new();
            var auth = $firebaseAuth();
            $controller("adminSettingsCtrl", {
                $scope: scope,
                $firebaseArray: $firebaseArray

            });
        });
    });
    it("createCompany should be registered correctly", function () {
        inject(function ($firebaseAuth, CommonProp) {
            var auth = $firebaseAuth();
            auth.$createUserWithEmailAndPassword("cameronsimon@gmail.com", "123").then(function () {
                //console.log("User Successfully Created");
                //$location.path('/adminSettings');
            }).catch(function (error) {
                //                $scope.errMsg = true;
                //                $scope.errorMessage = error.message;
            });

            var auth = $firebaseAuth();
            auth.$signInWithEmailAndPassword("cameronsimon@gmail.com", "123").then(function () {
                console.log("User Login Successful");
                CommonProp.setUser("cameronsimon@gmail.com");
                //$location.path('/home');
            }).catch(function (error) {

            });

            //            scope.user.changeAuthState({
            //                uid: 'testUid',
            //                provider: 'custom',
            //                token: 'authToken',
            //                expires: Math.floor(new Date() / 1000) + 24 * 60 * 60,
            //                auth: {
            //                    isAdmin: true
            //                }
            //            });

            


        });


    });
    //    it("createCompany should be called correctly", function () {
    //        scope.company = "Company";
    //          
    //        spyOn( scope, 'createCompany' ).and.callThrough();
    //        scope.$digest();
    //        scope.createCompany();
    //        expect(typeof(scope.createCompany)).toBe('function');
    //        expect(scope.createCompany).toHaveBeenCalled();
    //
    //    });
    //    it("A company should be added to companies", function () {
    //        scope.company = "Company";
    //        spyOn( scope, 'createCompany' ).and.callThrough();
    //        spyOn( scope.companies, '$add' ).and.callThrough()
    //        scope.$digest();
    //        scope.createCompany();
    //        expect(scope.companies.$add).toHaveBeenCalled();
    //
    //    });
});

describe("Unit Tests: contractorAdmin", function () {
    //window.MockFirebase.override();

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