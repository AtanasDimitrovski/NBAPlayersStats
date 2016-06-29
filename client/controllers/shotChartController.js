NbaApp.controller('ShotChartController', ['$scope', 'ShotChartService', 'SvgBasketballCourtService', '$routeParams',
    function ($scope, shotChartService, svgBasketballCourtService, $routeParams) {
        var podatoci;

        $scope.boxMade = true;
        $scope.boxMissed = true;
        $scope.progress = true;
        var id = $routeParams.id;
        var court_id = 'svg-container';

        shotChartService.getShotChartData(id, function (data) {
            podatoci = data;
            $scope.progress = false;
            drawShotChart(court_id);
        });

        var drawShotChart = function (id) {
            var base = svgBasketballCourtService.setCourt(id);

            for (var i = 0; i < podatoci.length; i++) {

                if (podatoci[i].made == 1) {
                    base.append("circle")
                        .attr("cx", 49.5 - ((podatoci[i].x + 250) / 10))
                        .attr("cy", 35.5 - (((podatoci[i].y + 30) / 10)))
                        .attr("r", 0.3)
                        .style("fill", "green");
                } else {
                    base.append("circle")
                        .attr("cx", 49.5 - ((podatoci[i].x + 250) / 10))
                        .attr("cy", 35.5 - (((podatoci[i].y + 30) / 10)))
                        .attr("r", 0.3)
                        .style("fill", "red");
                }
            }

            svgBasketballCourtService.getCourt(base);
        }


        $scope.onBoxChanged = function(){
            d3.select("#court").remove();
            var base = svgBasketballCourtService.setCourt(court_id);

            if ($scope.boxMade) {drawMadeShots(base);}
            if ($scope.boxMissed) {drawMissedShots(base);}

            svgBasketballCourtService.getCourt(base);
        }

        function drawMadeShots(base) {

            for (var i = 0; i < podatoci.length; i++) {

                if (podatoci[i].made == 1) {
                    base.append("circle")
                        .attr("cx", 49.5 - ((podatoci[i].x + 250) / 10))
                        .attr("cy", 35.5 - (((podatoci[i].y + 30) / 10)))
                        .attr("r", 0.3)
                        .style("fill", "green");
                }
            }
        }

        function drawMissedShots(base) {
            for (var i = 0; i < podatoci.length; i++) {

                if (podatoci[i].made == 0) {
                    base.append("circle")
                        .attr("cx", 49.5 - ((podatoci[i].x + 250) / 10))
                        .attr("cy", 35.5 - (((podatoci[i].y + 30) / 10)))
                        .attr("r", 0.3)
                        .style("fill", "red");
                }
            }
        }


    }])