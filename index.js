var express = require('express');
var bodyParser = require('body-parser');

var service = require('./externalServices/service');



var app = express();
app.use(express.static(__dirname+'/client'));

app.get('/', function(req, res){
    res.send('Hello world');
});

app.get('/shot-chart/:id', function(req, res){

    var playerId = req.params.id;

    service.getPlayerShotChart(playerId, function(data){
       res.send(data);
    });
});

app.get('/shot-efficiency/:id', function(req, res){
    var playerId = req.params.id;
    var courtWidth = req.query.courtWidth;
    var courtHeight = req.query.courtHeight;
    var fieldWidth = req.query.fieldWidth;
    var fieldHeight = req.query.fieldHeight;
    var maxColor = '#' + req.query.maxColor;

    service.getPlayerShotEfficiency(playerId, courtWidth, courtHeight, fieldWidth, fieldHeight, maxColor, function(data){
        res.send(data);
    })


})

app.get('/game/:id', function(req, res){
    var gameId = req.params.id;
    service.getGameById(gameId, function(data){
        res.send(data);
    })

})

app.get('/stats-month/:id', function(req, res){
    var gameId = req.params.id;
    service.getPlayerStatsByMonths(gameId, function(data){
        res.send(data);
    })
})

app.get('/players', function(req, res){

    var name = req.query.player_name;

    if (name != undefined){
        service.getPlayersByName(name, function(data){
            res.send(data);
        })
    }else{
        service.getPlayers(function(data){
            res.send(data);
        })
    }
});

app.get('/stats/:id', function(req, res){
    var playerId = req.params.id;
    service.getPlayerStats(playerId, function(data){
        res.send(data);
    })
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


