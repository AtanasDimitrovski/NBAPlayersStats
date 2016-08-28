
NbaApp.controller('HomeController', ['$scope', 'PlayerStatsService','$routeParams', function($scope, playerStatsService, $routeParams){

    $scope.test = "HELLO WORLD";
    var id = $routeParams.id;

    $scope.selected = [];

    $scope.query = {
        order: 'name',
        limit: 5,
        page: 1
    };

    playerStatsService.getPlayerInfo(id, function(data){
        $scope.player = data[0];

        $scope.image = 'http://stats.nba.com/media/players/230x185/' + $scope.player.id + '.png'

        playerStatsService.getTeamInfo($scope.player.team_id, function(data){
            $scope.team = data[0];
        })

    });

    playerStatsService.getPlayerStats(id, function(data){

        $scope.stats = data;
    })

    $scope.roundNum = function(num){
      return Math.round(num * 100);
    };

    $scope.roundNumAvg = function(num){
        return Math.round(num * 100) /100;
    };

}])