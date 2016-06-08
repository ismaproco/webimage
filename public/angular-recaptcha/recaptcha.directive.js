'use strict';

var module = angular.module('angular.recaptcha',[]);

module.directive('angRecaptcha',['$timeout', function($timeout){
   var template = 'angular-recaptcha/recaptcha.template.html';
    return {
        restrict: 'E', 
        templateUrl: template,
        controller: 'recaptchaController',
        controllerAs: 'ctrl',
        scope: {
          'verify': '&onVerify'
        },
        link: function( scope, element, attrs){
          function init(){
            var verifyCallback = function(response) {
                scope.verify( { $response: response } );
            };
            scope.name = attrs.name;

            scope.createNew = function() {
              //render the captcha
              grecaptcha.render(scope.name, {
                'sitekey' :attrs.siteKey,
                'callback' : verifyCallback,
                'theme' : 'light'
              });  
            };

            scope.reset = function() {
              grecaptcha.reset();
            }
            console.log(scope.createNew);
          }
          
          
          var waitCaptcha = function() {
            if(grecaptcha){
              init();
            } else {
              $timeout(function(){
                waitCaptcha();
              },500);  
            }
          };
          waitCaptcha();
        }
    }
}]);