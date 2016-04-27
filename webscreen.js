var spawn = require('child_process').spawn;
var child = spawn('phantomjs', [
  'phantom-script.js',
  'http://gmail.com'
]);

child.stdout.on('data', function(chunk) {
  console.log('time', new Date(), 'chunk', chunk.toString('ascii'));
});