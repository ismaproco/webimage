var app = angular.module('imageGenerator',[]);

app.controller('generatorController',['$scope', 'imageGenerationService' , 'popupService', 'localStorageService', function( $scope, igs, ps, ls ) {
  var ctrl = this;
  ctrl.images = ls.getAll();
  ctrl.processStatus = 'none';
  
  ctrl.process = function(){
    ctrl.processStatus = 'loading';
    
    if( ctrl.url.length > 0 ){
    
      if(!( ctrl.url.indexOf('http://') >= 0 || ctrl.url.indexOf('https://') >= 0) ){
         ctrl.url = 'http://' + ctrl.url;
      }
      
      var _url = ctrl.url;
      igs.getImage( ctrl.url ).then(function(result){
        ctrl.loadedUrl = result.data;  
        var imgObj = {
          src: 'http://isma.xyz/fc/'+ctrl.loadedUrl.split('_thumbnail')[0],
          thumbnail: 'http://isma.xyz/fc/'+ctrl.loadedUrl,
          text: _url
        };
        ctrl.images.push(imgObj);
        ls.add(_url,imgObj);
        ctrl.processStatus = 'finished';
      }, function errorCB(error){
        console.log('error', error);
        ctrl.processStatus = 'error';
      });      
    }
  };
  
  
  ctrl.removeItemFromList = function(image, index) {
    ctrl.images.splice(index, 1);
    ls.remove(image.text);
    console.log('image:',image,'index:' ,index);
  }
  
  ctrl.openImage = function(image) {
    ps.setImage(image);
    ps.show();
  };
  
  console.log('real',ctrl.loadedUrl);
}]);


app.service('imageGenerationService', ['$http',function($http){
  return { 
    getImage: function(_url) {
      _url = "http://isma.xyz/fc/process?url="+ _url + '&callback=JSON_CALLBACK';
      var prom = $http({
        method: 'GET',
        url: _url
      });
      return prom;
    }
  }
}]);


app.controller('popupController',['$scope', 'popupService', function($scope, popupService){
  var ctrl = this;
  ctrl.STATUS_HIDE = 'hide';
  ctrl.STATUS_SHOW = 'show';
  ctrl.status = ctrl.STATUS_HIDE;
  
  if(popupService){
    popupService.setController(ctrl);  
  }
  
  ctrl.toggle = function() {
    if( ctrl.status == ctrl.STATUS_HIDE ){
      ctrl.status = ctrl.STATUS_SHOW;
    } else if ( ctrl.status == ctrl.STATUS_SHOW ) {
      ctrl.status = ctrl.STATUS_HIDE;
    }
  };
  
  ctrl.setStatus = function(_status){
    ctrl.status = _status;
  };
  
  ctrl.setImage = function(_image){
    ctrl.image = _image;
  }
  
}]);


app.service('popupService', [function() {
  var service = {};
  var ctrl = {};
  service.setController = function( _ctrl ){
    ctrl = _ctrl;
  };
  
  service.getController = function( ){
    return ctrl;
  };
  
  return {
    show: function() {
      ctrl.setStatus(ctrl.STATUS_SHOW);
    },
    hide: function() {
      ctrl.setStatus(ctrl.STATUS_HIDE);
    },
    setImage: function(_image) {
      ctrl.image = _image;
    },
    setController: service.setController
  };
}]);


app.service('localStorageService', [function() {
  var service = {};
  
  service.add = function(key, object){
    localStorage[key] = JSON.stringify(object);
  }
  
  service.get = function(key) {
    return JSON.parse(localStorage[key]);
  };
  
  service.getAll = function(){
    var keys = Object.keys(localStorage);
    var arr = [];
    
    for(var i = 0; i < keys.length; i++){
      arr.push( service.get(keys[i]) );
    }
    return arr;
  }
  
  service.remove = function(key){
    localStorage.removeItem(key);
  }
  
  return {
    add: service.add, 
    get: service.get,
    getAll: service.getAll,
    remove: service.remove
  }
}]);

