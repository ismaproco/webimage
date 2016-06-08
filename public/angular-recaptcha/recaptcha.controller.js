'use strict';

var module = angular.module('angular.recaptcha');

module.controller('recaptchaController', ['$scope','$timeout',function(scope, $timeout){
  var ctrl = this;
  
  ctrl.updateRecaptcha = function(){
    console.log('ctrl', scope.createNew);
    scope.createNew();
  };
  
  ctrl.reset = function(){
    console.log('ctrl', scope.createNew);
    scope.reset();
  };
  
  $timeout(function(){
    ctrl.updateRecaptcha();
  },0);
  
}]);