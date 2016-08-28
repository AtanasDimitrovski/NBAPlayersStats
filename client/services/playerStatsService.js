/**
 * Created by Atanas on 29.06.2016.
 */
NbaApp.service('PlayerStatsService', ['$http', function($http){


    this.getPlayerStats = function(id, callback){
        $http.get("/stats/"+id).then(function (response) {
            callback(response.data);
        });
    }

    this.getMonthlyStats = function(id, callback){
        $http.get("/stats-month/"+id).then(function (response) {
            callback(response.data);
        });
    }

    this.getPlayerInfo = function(id, callback){
        $http.get("/players/"+id).then(function (response) {
            callback(response.data);
        });
    }

    this.getTeamInfo = function(id, callback){
        $http.get("/team/"+id).then(function (response) {
            callback(response.data);
        });
    }


}]);