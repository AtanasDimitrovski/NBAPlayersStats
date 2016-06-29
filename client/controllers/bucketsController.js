
NbaApp.controller('BucketsController', ['$scope', 'PlayerStatsService', '$routeParams', function($scope, playerStatsService, $routeParams){

    $scope.progress = true;
    var id = $routeParams.id;
    playerStatsService.getMonthlyStats(id, function(data){


        var pts = new Array(7);

        for (var i=10; i<data.length; i++){
            pts[i-10] = Math.round(data[i].pts_avg * 100) / 100;
        }

        for (var i=1; i<5; i++){
            pts[i+2] = Math.round(data[i].pts_avg * 100) / 100;
        }


        $scope.data = [];
        $scope.data2 = [];
        $scope.data.push(pts);
        $scope.data2.push(pts);

        playerStatsService.getPlayerStats(id, function(data){

            var player_avg = [];
            console.log(data);
            for (var j=0; j<$scope.labels.length; j++){
                player_avg.push(Math.round(data.pts_avg * 100) / 100)
            }

            $scope.data.push(player_avg);
            $scope.progress = false;

        });
    });

    $scope.labels = ["October", "November", "December", "January", "February", "March", "April"];
    $scope.series = ['Player month average', 'Player season Average'];

/*    $scope.labels = ["October", "November", "December", "January", "February", "March", "April"];
    $scope.series = ['Player month average', 'Player Average', "League Average"];*/


    $scope.options = {
        scales: {
            yAxes: [{
                display: true,
                ticks: {
                    suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                    // OR //
                    beginAtZero: true   // minimum value will be 0.
                }
            }]
        },
        legend: { display: true },
        responsive: false

    }

    $scope.serie = ['Player monthly progress'];

}])