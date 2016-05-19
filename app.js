'use strict';

var express = require('express');
var app = express();

var spawn = require('child_process').spawn;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/process', function(req, res) {
  console.log('get process', req.query.url);
  var sent_flag = false;
  
  if(req.query.url) {  
    try {
      var child = spawn('phantomjs', [
        'phantom-script.js',
        req.query.url
      ]);

      child.stdout.on('data', function(chunk) {
        var imageName = chunk.toString('ascii').split('/')[1]+'/'+chunk.toString('ascii').split('/')[2]; 
        console.log('time', new Date(), 'chunk', chunk.toString('ascii'), 'imageName', imageName);
        if(!sent_flag){
          if(imageName && imageName.indexOf('.png') > 0) {
            res.send(imageName);
            sent_flag = true;
          }
        }
        
      });  
    } catch (ex) {
     console.log( 'error generation image', ex ); 
    }
  } else {
    res.send('process NO URL');  
  }
});

app.listen(8090, function () {
  console.log('Example app listening on port 8090!');
});