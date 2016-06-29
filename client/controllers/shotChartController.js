
NbaApp.controller('ShotChartController', ['$scope', 'ShotChartService', 'SvgBasketballCourtService', '$routeParams',
    function($scope, shotChartService, svgBasketballCourtService, $routeParams){
   var podatoci;

    $scope.progress = true;
    var id = $routeParams.id;

   shotChartService.getShotChartData(id, function(data){
      podatoci = data;
       $scope.progress = false;
       drawShotChart('svgel');
   });

    var drawShotChart = function(id){
        var base = svgBasketballCourtService.setCourt(id);

        for (var i=0; i<podatoci.length; i++){

            if (podatoci[i].made==1) {
                base.append("circle")
                    .attr("cx", 49.5 - ((podatoci[i].x + 250) / 10))
                    .attr("cy", 35.5 - (((podatoci[i].y + 30) / 10)))
                    .attr("r", 0.3)
                    .style("fill", "green");
            }else{
                base.append("circle")
                    .attr("cx", 49.5 - ((podatoci[i].x + 250) / 10))
                    .attr("cy", 35.5 - (((podatoci[i].y + 30) / 10)))
                    .attr("r", 0.3)
                    .style("fill", "red");
            }
        }

        svgBasketballCourtService.getCourt(base);
    }
}])