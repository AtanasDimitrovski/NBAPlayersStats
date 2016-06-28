var express = require('express');
var bodyParse = require('body-parser');

var service = require('./externalServices/service');


var app = express();

app.use(express.static(__dirname+'/client'));

app.get('/', function(req, res){
    res.send('Hello world');
});

app.get('/weather', function(req, res){
   service.getData(function(data){
       res.send(data);
   });
});

app.get('/boston', function(req, res){
   service.getIsaiah(function(data){
       res.send(data);
   });
});

app.listen(3000, function(){
    console.log('server listening on port 3000...')
});


