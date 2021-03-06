var myApp = angular.module('myApp', ['ngRoute', 'textAngular', 'ngSanitize']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/home.html',
      controller: 'homeController',
      access: {restricted: false}
    })
    .when('/about', {
      templateUrl: '/partials/about.html',
      access: {restricted: false}
    })
    .when('/contact', {
      templateUrl: '/partials/contact.html',
      access: {restricted: false}
    })
    .when('/post/:title', {
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
      templateUrl: 'partials/admin.html',
      access: {restricted: true}
    })
    .when('/admin/add', {
      templateUrl: 'partials/adminAdd.html',
      controller: 'adminAddController',
      access: {restricted: true}
    })
    .when('/admin/delete', {
      templateUrl: 'partials/adminDelete.html',
      controller: 'adminDeleteController',
      access: {restricted: true}
    })
    .when('/admin/edit', {
      templateUrl: 'partials/adminEdit.html',
      controller: 'adminEditController',
      access: {restricted: true}
    })
    .when('/admin/edit/:title', {
      templateUrl: 'partials/adminEditPost.html',
      controller: 'adminEditPostController',
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
