/**
 * Created by Atanas on 21.06.2016.
 */

var request = require('request');

const API_KEY = 'Id3OY9w2sJA1jgmXtaKlC4GxLSReDEBr';

module.exports.getData = function(callback){
    request.get('http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=bdd491f97e844fa77cf49213c0143515', function (err, res, body) {
        if (!err) {
            var resultsObj = JSON.parse(body);
            //Just an example of how to access properties:
            callback(resultsObj);
            //console.log(resultsObj);
        }
    });
};



module.exports.getIsaiah = function(callback){
    request.post('http://api.probasketballapi.com/shots?api_key=Id3OY9w2sJA1jgmXtaKlC4GxLSReDEBr&player_id=2592', function (err, res, body) {
        if (!err) {
            var resultsObj = JSON.parse(body);

            var numberOfShots = Object.keys(resultsObj).length;

            var shotsArray = [];

            for (var i=0; i<numberOfShots; i++){

                if (resultsObj[i].game_id.toString().substring(0,3) == "215") {
                    console.log(resultsObj[i].game_id);
                    var shot = {};
                    shot.x = resultsObj[i].loc_x;
                    shot.y = resultsObj[i].loc_y;
                    shot.made = resultsObj[i].shot_made_flag;
                    shot.gameId = resultsObj[i].game_id;

                    shotsArray.push(shot);
                }
            }

            console.log(Object.keys(resultsObj).length);
            //Just an example of how to access properties:
            callback(shotsArray);
            //console.log(resultsObj);
        }
    });
};

//http://api.probasketballapi.com/shots?api_key=Id3OY9w2sJA1jgmXtaKlC4GxLSReDEBr&player_id=202738


//http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=bdd491f97e844fa77cf49213c0143515

