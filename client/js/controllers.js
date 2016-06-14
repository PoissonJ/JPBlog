angular.module('myApp').controller('homeController',
  ['$scope', '$http',
  function ($scope, $http) {
    $http.get('/api/blog').success(function(response) {
      console.log(response);
      $scope.blogs = response;
    });
  }
]);

angular.module('myApp').controller('blogPostController',
  ['$scope', '$http', '$routeParams',
  function ($scope, $http, $routeParams) {
    $http.get('/api/blog/' + $routeParams.title).success(function(response) {
      console.log(response);
      $scope.blog = response;
    });
  }
]);

angular.module('myApp').controller('loginController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
      // handle success
      .then(function() {
        $location.path('/');
        $scope.disabled = false;
        $scope.loginForm = {};
      })
      // handle error
      .catch(function() {
        $scope.error = true;
        $scope.errorMessage = "Invalid username and/or password";
        $scope.disabled = false;
        $scope.loginForm = {};
      });
    };
  }
]);

angular.module('myApp').controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
      // handle success
      .then(function() {
        $location.path('/login');
        $scope.disabled = false;
        $scope.registerForm = {};
      })
      // handle error
      .catch(function() {
        $scope.error = true;
        $scope.errorMessage = "Something went wrong!";
        $scope.disabled = false;
        $scope.loginForm = {};
      });
    };
  }
]);

angular.module('myApp').controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function($scope, $location, AuthService) {

    $scope.logout = function() {

      // call logout from service
      AuthService.logout()
      .then(function() {
        $location.path('/login');
      });
    };
  }
]);
