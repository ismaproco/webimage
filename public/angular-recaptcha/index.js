var app = angular.module('app', ['angular.recaptcha']);

app.controller('mainController', ['$scope', function($scope){
  console.log('this is a controller');
  $scope.response = '';
  this.onResponse = function(response){
    $scope.response = response;
    console.log('RIM---------------------', $scope.response);
  };
}])