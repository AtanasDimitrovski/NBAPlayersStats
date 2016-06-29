
NbaApp.service('ShotChartService', ['$http', function($http){


    this.getShotChartData = function(id, callback){
        $http.get("/shot-chart/"+id).then(function (response) {
            callback(response.data);
        });
    }

    this.getShotChartEfficiency = function(id, courtWidth, courtHeight, fieldWidth, fieldHeight, maxColor, callback){
        $http.get('/shot-efficiency/'+id+'?courtWidth='+courtWidth+'&courtHeight='+courtHeight+'&fieldWidth='+fieldWidth+'&fieldHeight='+fieldHeight+'&maxColor='+maxColor).then(function (response) {
            callback(response.data);
        });
    }

}]);