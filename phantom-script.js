var system = require('system');
var page = require('webpage').create();

page.viewportSize = {
  width: 1024,
  height: 768
};


var url;

if( !system.args[1] ) {
  console.log('exit');
  phantom.exit();
}

url = system.args[1];

page.open( url , function() {
  var imageName = 'public/image_'+Date.parse(new Date())+'.png';
  page.render(imageName);
  console.log('image:', imageName);
  phantom.exit();
});