/**
 * Created by Atanas on 21.06.2016.
 */

var request = require('request');

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


//http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=bdd491f97e844fa77cf49213c0143515