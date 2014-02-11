'use strict';

angular.module('recipeManagerApp', [
  'ngResource',
  'ngRoute',
  'firebase'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/create', {
        templateUrl: 'views/details.html',
        controller: 'CreateCtrl'
      })
      .when('/edit/:recipeId', {
        templateUrl: 'views/details.html',
        controller: 'EditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });