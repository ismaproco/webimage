angular.module('simple.angular.recaptcha')
.directive('simpleAngularRecaptcha',['$timeout', 'recaptchaService', function( $timeout, recaptchaService ){
  'use strict';
  
   var template = 'angular-recaptcha/recaptcha.template.html';
    return {
        restrict: 'EA', 
        templateUrl: template,
        scope: {
          'verify': '&onVerify'
        },
        link: function( scope, element, attrs){
          // set directive properties and and variables
          scope.isVisible = true;
          scope.name = attrs.name;
          
          var captcha = {};
          
          if( attrs.hasOwnProperty('isVisible') ){
            scope.isVisible = attrs.isVisible;  
          }
          
          var verifyCallback = function(response) {
              scope.verify( { $response: response } );
          };
          
          // set the captcha properties
          captcha.createNew = function() {
            //render the captcha
            grecaptcha.render(scope.name, {
              'sitekey' :attrs.siteKey,
              'callback' : verifyCallback,
              'theme' : 'light'
            });  
          };

          captcha.reset = function() {
            grecaptcha.reset();
          }

          captcha.setVisible = function( _isVisible ){
            if( typeof _isVisible !== 'undefined' ){
              scope.isVisible = _isVisible;
            }
          }

          captcha.toggle = function(){
            scope.isVisible = !scope.isVisible;
          }
          
          captcha.isVisible = function(){
            return scope.isVisible;
          }
          
          // Initialize the captcha service
          function init(){
            // set the captcha object of the service
            recaptchaService.setCaptcha(captcha);
            captcha.createNew();
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
          
          // wait for the full apply
          $timeout(function(){
              waitCaptcha();
          },0);
          
        }
    }
}]);