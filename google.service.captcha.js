// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var request = require('request');
var q = require('q');

function PostCode(captchaResponse) {
  var deferred = q.defer();
  
  var params = {
    secret: '6Lcm5SETAAAAAK7ebj4C2XKrVh9TXmE0N-0N0bCZ',
    response: captchaResponse || ''
  }
  
  request.post('https://www.google.com/recaptcha/api/siteverify', {form:params},  function (error, response, body) {
    if(error) {
      deferred.reject(error);
    }
    
    deferred.resolve(JSON.parse(body));
  });
  
  return deferred.promise;
}

module.exports = {
  isCaptchaValid: function( captchaResponse ) {
    var pc =  PostCode(captchaResponse);
    console.log('pc',pc);
    return pc;
  }
}