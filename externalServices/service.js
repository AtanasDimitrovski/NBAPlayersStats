/**
 * Created by Atanas on 21.06.2016.
 */

var request = require('request');

const API_KEY = 'YOg78ZtrbJezfa96mGlU10cvnwB2PyuE';


module.exports.getPlayerShotChart = function (id, callback) {
    request.post('http://api.probasketballapi.com/shots?api_key=' + API_KEY + '&player_id=' + id, function (err, res, body) {
        if (!err) {
            var resultsObj = JSON.parse(body);

            var numberOfShots = Object.keys(resultsObj).length;

            var shotsArray = [];

            for (var i = 0; i < numberOfShots; i++) {

                if (resultsObj[i].game_id.toString().substring(0, 3) == "215") {
                    var shot = {};
                    shot.x = resultsObj[i].loc_x;
                    shot.y = resultsObj[i].loc_y;
                    shot.made = resultsObj[i].shot_made_flag;
                    shot.gameId = resultsObj[i].game_id;

                    shotsArray.push(shot);
                }
            }

            callback(shotsArray);
        }
    });
};

module.exports.getPlayerStats = function (id, callback) {
    request.post('http://api.probasketballapi.com/boxscore/player?api_key=' + API_KEY + '&player_id=' + id, function (err, res, body) {
        if (!err) {
            var resultsObj = JSON.parse(body);
            var numberOfGames = Object.keys(resultsObj).length;

            var shotsArray = [];

            pt2m = 0;
            pt2a = 0;
            var fgMade = 0;
            var fgAt = 0;
            var pt3Made = 0;
            var pt3At = 0;
            var ftMade = 0;
            var ftAt = 0;
            var pts = 0;
            var asists = 0;
            var games = 0;
            var blks = 0;
            var steals = 0;
            var to = 0;
            var reb = 0;
            var pf = 0;
            var dreb = 0;
            var oreb = 0;

            var max = 0;

            for (var i = 0; i < numberOfGames; i++) {

                if (resultsObj[i].game_id.toString().substring(0, 3) == "215") {
                    fgMade += resultsObj[i].fgm;
                    fgAt += resultsObj[i].fga;
                    pt2a += resultsObj[i].fga - resultsObj[i].fg3a;
                    pt2m += resultsObj[i].fgm - resultsObj[i].fg3m;
                    pt3Made += resultsObj[i].fg3m;
                    pt3At += resultsObj[i].fg3a;
                    ftMade += resultsObj[i].ftm;
                    ftAt += resultsObj[i].fta;
                    pts += resultsObj[i].pts;
                    blks += resultsObj[i].blk;
                    steals += parseInt(resultsObj[i].stl);
                    to += resultsObj[i].to;
                    reb += resultsObj[i].oreb + resultsObj[i].dreb;
                    asists += resultsObj[i].ast;
                    pf += resultsObj[i].pf;
                    dreb += resultsObj[i].dreb;
                    oreb += resultsObj[i].oreb;
                    games += 1;

                    if (resultsObj[i].pts > max)
                        max = resultsObj[i].pts;

                }
            }


            var result = {
                "fg_pct": fgMade / fgAt,
                "pt2_pct": pt2m / pt2a,
                "pt3_pct": pt3Made / pt3At,
                "ft_pct": ftMade / ftAt,
                "pts_avg": pts / games,
                "games": games,
                "blk_avg": blks / games,
                "stl_avg": steals / games,
                "reb_avg": reb / games,
                "oreb_avg": oreb / games,
                "dreb_avg": dreb / games,
                "ast_avg": asists / games,
                "to_avg": to / games,
                "pf_avg": pf / games,
                "max": max
            }

            callback(result);
        }
    });
}


module.exports.getGameById = function (id, callback) {
    request.post('http://api.probasketballapi.com/game?api_key=' + API_KEY + '&game_id=' + id, function (err, res, body) {
        if (!err) {
            var resultsObj = JSON.parse(body);
            var month = resultsObj[0].date.substring(5, 7);
            callback(month);
        }
    });
}

var getGameById = function (id, callback) {
    request.post('http://api.probasketballapi.com/game?api_key=' + API_KEY + '&game_id=' + id, function (err, res, body) {
        if (!err) {
            var resultsObj = JSON.parse(body);
            var month = resultsObj[0].date.substring(5, 7);
            callback(month);
        }
    });
}


module.exports.getPlayerStatsByMonths = function (id, callback) {
    request.post('http://api.probasketballapi.com/boxscore/player?api_key=' + API_KEY + '&player_id=' + id, function (err, res, body) {
        if (!err) {
            var resultsObj = JSON.parse(body);
            var numberOfGames = Object.keys(resultsObj).length;
            var games = getSeason(resultsObj, numberOfGames, '215');
            var map = {};
            var flag = 0;
            var results = [];

            var months = new Array(13);
            for (var i=0; i<13; i++){
                months[i] = {
                    "month": getMonth(i),
                    "month_num": i,
                    "games": 0,
                    "pts": 0,
                    "pts_avg": 0
                }
            }

            for (var i=0; i<games.length; i++){
                request.post('http://api.probasketballapi.com/game?api_key=' + API_KEY + '&game_id=' + games[i].game_id, function (err, res, body) {
                    if (!err) {
                        flag++;
                        var res = JSON.parse(body);
                        var month = res[0].date.substring(5, 7);
                        var game = res[0].id;
                        map[game] = month;
                        if (flag == games.length) {

                            for (var j = 0; j < games.length; j++) {

                                var game_id = games[j].game_id;
                                months[parseInt(map[game_id])].games+=1;
                                months[parseInt(map[game_id])].pts+=games[j].pts;
                                months[parseInt(map[game_id])].pts_avg=months[parseInt(map[game_id])].pts/months[parseInt(map[game_id])].games;
                            }

                            callback(months);

                        }
                    }
                });
            }

        }
    });
}


module.exports.getPlayers = function (callback) {
    request.post('http://api.probasketballapi.com/player?api_key=' + API_KEY, function (err, res, body) {
        if (!err) {
            var resultsObj = JSON.parse(body);
            var numberOfPlayers = Object.keys(resultsObj).length;
            var result = [];
            for (var i = 0; i < numberOfPlayers; i++) {
                if (resultsObj[i].dk_position != "") {
                    result.push(resultsObj[i]);
                }
            }
            callback(result);
        }
    });
};


module.exports.getPlayersByName = function (name, callback) {
    request.post('http://api.probasketballapi.com/player?api_key=' + API_KEY, function (err, res, body) {
        if (!err) {
            var resultsObj = JSON.parse(body);
            var numberOfPlayers = Object.keys(resultsObj).length;
            var result = [];
            for (var i = 0; i < numberOfPlayers; i++) {
                if (resultsObj[i].dk_position != ""){
                    var playerName = resultsObj[i].player_name.toString().toLowerCase();
                    name = name.toString().toLowerCase();

                    if (playerName.indexOf(name) > -1) {
                        result.push(resultsObj[i]);
                    }
                }

            }

            callback(result);
        }
    });
}

module.exports.getTeam = function(id, callback){
    request.post('http://api.probasketballapi.com/team?api_key=' + API_KEY + '&team_id='+id, function (err, res, body) {
        if (!err) {
            var resultsObj = JSON.parse(body);
            callback(resultsObj);
        }
    });
}


module.exports.getPlayerInfo = function(id, callback){
    request.post('http://api.probasketballapi.com/player?api_key=' + API_KEY + '&player_id='+id, function (err, res, body) {
        if (!err) {
            var resultsObj = JSON.parse(body);
            callback(resultsObj);
        }
    });
}

module.exports.getPlayerShotEfficiency = function (id, courtWidth, courtHeight, fieldWidth, fieldHeight, maxColor, callback) {

    var numberOfColumns = Math.floor(courtWidth / fieldWidth);
    var numberOfRows = Math.floor(courtHeight / fieldHeight);


    var matrix = [];
    for (var i = 0; i < numberOfColumns; i++) {
        matrix[i] = new Array(numberOfRows);
        for (var j = 0; j < numberOfRows; j++) {
            matrix[i][j] = {
                "madeShots": 0,
                "missedShots": 0
            };
        }
    }

    this.getPlayerShotChart(id, function (data) {

        var result = [];

        for (var i = 0; i < data.length; i++) {
            var x = (courtWidth - 0.5) - ((data[i].x + 250) / 10);
            var y = (courtHeight - 1.5) - ((data[i].y + 30) / 10);

            var row = Math.floor(y / fieldHeight);
            var column = Math.floor(x / fieldWidth);

            if (row >= 0 && column >= 0 && row < 10 && column < 12) {
                if (data[i].made == 1) {
                    matrix[column][row].madeShots += 1;
                }
                else {
                    matrix[column][row].missedShots += 1;
                }
            }
        }


        for (var i = 0; i < numberOfColumns; i++) {
            for (var j = 0; j < numberOfRows; j++) {

                var shots = matrix[i][j].missedShots + matrix[i][j].madeShots;
                var resultColor = "#FFFFFF";

                var shot_percentage = 0;

                if (shots > 0) {
                    shot_percentage = matrix[i][j].madeShots / shots;
                    var colorPercent = 1 - shot_percentage;
                    if (colorPercent != 1)
                        resultColor = shadeBlend(colorPercent, maxColor);
                }

                result.push({
                    "x": i * fieldWidth,
                    "y": j * fieldHeight,
                    "color": resultColor,
                    "percent": shot_percentage,
                    "made": matrix[i][j].madeShots,
                    "shots": shots
                })
            }
        }

        callback(result);

    })

}


function getSeason(data, dataLength, season){
    var result = [];
    for (var i = 0; i < dataLength; i++) {
        if (data[i].game_id.toString().substring(0, 3) == "215") {
            result.push(data[i]);
        }
    }
    return result;
}

function getMonth(num){
    var monthNames = [ "None", "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];
    return monthNames[num];
}

function shadeBlend(p, c0, c1) {
    var n = p < 0 ? p * -1 : p, u = Math.round, w = parseInt;
    if (c0.length > 7) {
        var f = c0.split(","), t = (c1 ? c1 : p < 0 ? "rgb(0,0,0)" : "rgb(255,255,255)").split(","), R = w(f[0].slice(4)), G = w(f[1]), B = w(f[2]);
        return "rgb(" + (u((w(t[0].slice(4)) - R) * n) + R) + "," + (u((w(t[1]) - G) * n) + G) + "," + (u((w(t[2]) - B) * n) + B) + ")"
    } else {
        var f = w(c0.slice(1), 16), t = w((c1 ? c1 : p < 0 ? "#000000" : "#FFFFFF").slice(1), 16), R1 = f >> 16, G1 = f >> 8 & 0x00FF, B1 = f & 0x0000FF;
        return "#" + (0x1000000 + (u(((t >> 16) - R1) * n) + R1) * 0x10000 + (u(((t >> 8 & 0x00FF) - G1) * n) + G1) * 0x100 + (u(((t & 0x0000FF) - B1) * n) + B1)).toString(16).slice(1)
    }
}
