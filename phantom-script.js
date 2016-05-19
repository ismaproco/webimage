var system = require('system');
var page = require('webpage').create();
var spawn = require('child_process').spawn;

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
  var imageName = 'public/images/image_'+Date.parse(new Date())+'.png';
  page.render(imageName);
   try {
    var child = spawn('./create_thumbnail.sh', [
      imageName
    ]);

    child.stdout.on('data', function(chunk) {
      console.log(chunk.toString('ascii'));
      phantom.exit();
    });  
  } catch (ex) {
   console.log( 'error generation image', ex ); 
  }
  
  
});