var app = angular.module('imageGenerator',[]);

app.controller('generatorController',['$scope', 'imageGenerationService' , 'popupService', function( $scope, igs, ps ) {
  var ctrl = this;
  ctrl.images = [
    {src: 'http://isma.xyz/fc/image_1462184462000.png', thumbnail: 'http://isma.xyz/fc/image_1462184462000.png_thumbnail.png'},
    {src: 'http://isma.xyz/fc/image_1462184618000.png', thumbnail: 'http://isma.xyz/fc/image_1462184618000.png_thumbnail.png'},
    {src: 'http://isma.xyz/fc/image_1462192361000.png', thumbnail: 'http://isma.xyz/fc/image_1462192361000.png_thumbnail.png'},
    {src: 'http://isma.xyz/fc/image_1462192287000.png', thumbnail: 'http://isma.xyz/fc/image_1462192287000.png_thumbnail.png'}
  ];
  
  
  ctrl.process = function(){
    if(ctrl.url.indexOf('http://') >= 0 || ctrl.url.indexOf('https://') >= 0 ){
        igs.getImage( ctrl.url ).then(function(result){
          ctrl.loadedUrl = result.data;  
          
          ctrl.images.push({
            src: 'http://isma.xyz/fc/'+ctrl.loadedUrl.split('_thumbnail')[0],
            thumbnail: 'http://isma.xyz/fc/'+ctrl.loadedUrl,
            text: ctrl.url
          });
        }, function errorCB(error){
          console.log('error', error);
        });      
    }
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