angular.module('myApp').controller('homeController',
  ['$scope', '$http',
  function ($scope, $http) {
    $http.get('/api/blog').success(function(response) {
      console.log(response);
      var blogs = response;
      blogs.forEach(function(blog) {
        var date = new Date(blog.date);

        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        blog.created_on = blog.date;
        blog.date = monthNames[monthIndex] + " " + day + ", " + year;
      });

      $scope.blogs = blogs;
      $scope.sortBlog = function(blog) {
        var date = new Date(blog.created_on);
        return date;
      }

    });
  }
]);

angular.module('myApp').controller('adminAddController',
  ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $scope.createBlog = function() {
      var title = $scope.title;
      var author = $scope.author;
      var body = $scope.body;
      var preview = $scope.preview;
      var date = new Date();

      $http.post('api/blog/create',
      {title: title, author: author, body: body, date: date, preview: preview})
      .success(function() {
        $location.path('/');
        $scope.title   = '';
        $scope.author  = '';
        $scope.body    = '';
        $scope.preview = '';
      })
      .error(function() {
        alert("Error in trying to post. All fields required");
      });
    }
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

angular.module('myApp').controller('adminDeleteController',
  ['$scope', '$http', '$location',
  function ($scope, $http, $routeParams, $location) {
    $http.get('/api/blog').success(function(response) {
      $scope.blogs = response;
    });

    $scope.deletePost = function(blog) {
      var ask = confirm("Delete " + blog.title + "?");
      if (ask) {
        $http.delete('/api/blog/delete/' + blog._id);
        $http.get('/api/blog').success(function(response) {
          $scope.blogs = response;
        });
      };
    };

    $scope.sortBlog = function(blog) {
      var date = new Date(blog.date);
      return date;
    };
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
        $location.path('/admin');
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
