'use restrict';
angular.module('webApp.register', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/register.html',
        controller: 'RegisterCtrl'
    });
}]).controller('RegisterCtrl', ['$scope', '$firebaseAuth', '$location', 'CommonProp', function ($scope, $firebaseAuth, $location, CommonProp) {
    /* 
        RegisterCtrl helps with the logic of signing up a new Admin into the system. 
    .*/
    /*
        If user is not authenticated, bring them back to the welcome page.
    */
    $scope.username = CommonProp.getUser();
    if (!$scope.username) {
        $location.path('/welcome');
    }
    /*
        Function used to sign up an admin. Requires a email and password from the model. 
    */
    $scope.signUp = function () {
        var username = $scope.user.email;
        var password = $scope.user.password;
        if (username && password) {
            var auth = $firebaseAuth();
            auth.$createUserWithEmailAndPassword(username, password).then(function () {
                console.log("User Successfully Created");
                $("#adminCreatedSuccessfullyModal").modal('show');
                //$location.path('/adminSettings');
            }).catch(function (error) {
                $scope.errMsg = true;
                $scope.errorMessage = error.message;
            });
        }
    }
}])