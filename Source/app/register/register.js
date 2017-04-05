'use restrict';
angular.module('webApp.register', ['ngRoute', 'firebase']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/register.html'
        , controller: 'RegisterCtrl'
    });
}]).controller('RegisterCtrl', ['$scope', '$firebaseAuth', '$location', function ($scope, $firebaseAuth, $location) {
    /* This will signup the new admin to access the system.*/
    $scope.signUp = function () {
        var username = $scope.user.email;
        var password = $scope.user.password;
        if (username && password) {
            var auth = $firebaseAuth();
            auth.$createUserWithEmailAndPassword(username, password).then(function () {
                console.log("User Successfully Created");
                $location.path('/adminSettings');
            }).catch(function (error) {
                $scope.errMsg = true;
                $scope.errorMessage = error.message;
            });
        }
    }
}])