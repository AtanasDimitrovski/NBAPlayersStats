/**
 * Created by Atanas on 29.06.2016.
 */

NbaApp.controller('ProbabilityController', ['$scope', 'ShotChartService', 'SvgBasketballCourtService', '$routeParams',
    function ($scope, shotChartService, svgBasketballCourtService, $routeParams) {
        /**
         * Created by Atanas on 23.06.2016.
         */

        $scope.radioValue = "none";

        $scope.progress = true;
        var podatoci;
        var id = $routeParams.id;

        var svg_id = 'svg-container';

        shotChartService.getShotChartEfficiency(id, 50, 37, 5, 3, '7FFF00', function (data) {
            podatoci = data;
            console.log(data);
            $scope.progress = false;
            drawEfficiencyMap(svg_id);
        });


        var drawEfficiencyMap = function (id) {

            var base = svgBasketballCourtService.setCourt(id);
            for (var i = 0; i < podatoci.length; i++) {
                base.append("rect")
                    .attr("x", podatoci[i].x)
                    .attr("y", podatoci[i].y)
                    .attr("width", 5)
                    .attr("height", 3)
                    .style("stroke", podatoci[i].color)
                    .style("fill", podatoci[i].color)

                if ($scope.radioValue == 'shots'){

                    if (podatoci[i].shots > 0){
                        base.append("text")
                            .attr("x", podatoci[i].x+1)
                            .attr("y", podatoci[i].y+1.5)
                            .style("font-size", 1)
                            .text(podatoci[i].made.toString() + "/" + podatoci[i].shots.toString())
                    }

                }

                if ($scope.radioValue == 'percent'){
                    if (Math.round(podatoci[i].percent * 100) > 0){
                        base.append("text")
                            .attr("x", podatoci[i].x+1)
                            .attr("y", podatoci[i].y+1.5)
                            .style("font-size", 1)
                            .text(Math.round(podatoci[i].percent * 100) + "%")
                    }
                }

            }
            svgBasketballCourtService.getCourt(base);

        }


        $scope.onRadioChange= function(){
            d3.select("#"+svg_id).select("#court").remove();
            drawEfficiencyMap(svg_id);
        }

    }])