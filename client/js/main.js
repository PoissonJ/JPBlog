var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/home.html',
      controller: 'homeController',
      access: {restricted: false}
    })
    .when('/post/:id', {
      templateUrl: '/partials/post.html',
      controller: 'blogPostController',
      access: {restricted: false}
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
    .when('/admin', {
      template: '<h1>This is page one!</h1>',
      access: {restricted: true}
    })
    .when('/two', {
      template: '<h1>This is page two!</h1>',
      access: {restricted: true}
    })
    .otherwise({
      redirectTo: '/'
    })

    // user the HTML5 History API for pretty urls
    // $locationProvider.html5Mode(true);
});

myApp.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function() {
        if (next.access.restricted && !AuthService.isLoggedIn()) {
          $location.path('/login');
        }
      });
  });
});
