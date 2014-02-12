'use strict';

var app = angular.module('recipeManagerApp');

var ref = new Firebase('https://recipe-manager-v1.firebaseio.com/');

app.controller('MainCtrl', ['$scope', '$firebase', function ($scope, $firebase) {

  $scope.recipes = $firebase(ref);

  $scope.destroy = function(key){
    $scope.recipes.$remove(key);
  };

}]);


app.controller('CreateCtrl',
  ['$scope',
    '$location',
    '$firebase',
  function($scope, $location, $firebase){

    $scope.recipes = $firebase(ref);

    $scope.recipe = {};

    $scope.create = function(){

      $scope.recipes.$add($scope.recipe);

      $scope.recipe = {};

      $location.path('/');
    };

    $scope.cancel = function(){

      $location.path('/');

    };
  }]);

app.controller('EditCtrl',
  ['$scope',
    '$routeParams',
    '$firebase',
    '$location',
  function($scope, $routeParams, $firebase, $location){

    $scope.recipe = $firebase(new Firebase('https://recipe-manager-v1.firebaseio.com/' + $routeParams.recipeId));

    $scope.create = function(){
      $scope.recipe.$save();
      $location.path('/');
    };

    $scope.cancel = function(){
      $location.path('/');
    };

  }]);
