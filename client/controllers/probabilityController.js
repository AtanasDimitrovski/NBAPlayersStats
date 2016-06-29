/**
 * Created by Atanas on 29.06.2016.
 */

NbaApp.controller('ProbabilityController', ['$scope', 'ShotChartService', 'SvgBasketballCourtService', '$routeParams',
    function($scope, shotChartService, svgBasketballCourtService, $routeParams){
    /**
     * Created by Atanas on 23.06.2016.
     */
    $scope.progress = true;
    var podatoci;
var id = $routeParams.id;

    shotChartService.getShotChartEfficiency(id, 50, 37, 5, 3, '7FFF00', function(data){
        podatoci = data;
        $scope.progress = false;
        drawEfficiencyMap('shot');
    });


    var drawEfficiencyMap = function(id){

        var base = svgBasketballCourtService.setCourt(id);
        for (var i=0; i<podatoci.length; i++){
            base.append("rect")
                .attr("x", podatoci[i].x)
                .attr("y", podatoci[i].y)
                .attr("width", 5)
                .attr("height", 3)
                .style("stroke", podatoci[i].color)
                .style("fill", podatoci[i].color)
        }

        svgBasketballCourtService.getCourt(base);

    }

}])