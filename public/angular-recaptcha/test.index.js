var app = angular.module('app', ['simple.angular.recaptcha']);

app.controller('mainController', ['$scope', 'recaptchaService',  function($scope, service){
  console.log('this is a controller');
  $scope.response = '';
  this.onResponse = function(response){
    $scope.response = response;
    console.log('RIM---------------------', $scope.response);
  };
  
  this.reset = function() {
    service.reset();
  }
  
  this.toggle = function() {
    service.toggle();
  }
  
}])