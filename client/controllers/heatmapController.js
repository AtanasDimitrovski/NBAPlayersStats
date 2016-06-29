
NbaApp.controller('HeatmapController', ['$scope', 'ShotChartService', 'SvgBasketballCourtService', '$routeParams',
    function($scope, shotChartService, svgBasketballCourtService, $routeParams){
    /**
     * Created by Atanas on 23.06.2016.
     */
    $scope.progress = true;
    var podatoci;

        var id = $routeParams.id;

    shotChartService.getShotChartData(id, function(data){
        podatoci = data;
        $scope.progress = false;
        drawHeatMap('heatmap-court');
    });


    var drawHeatMap = function(id){
        var base = svgBasketballCourtService.setCourt(id);

        var matrix = [];
        var color1 = "#8b0000";
        var color2 = "#FFF0F0";
        var shadedcolor1 = shadeBlend(0,color1);
        var max = 0;

        for (var i=0; i<10; i++){
            matrix[i] = new Array(12);
            for (var j=0; j<12; j++){
                matrix[i][j] = 0;
            }
        }


        for (var i=0; i<podatoci.length; i++){
            var x = 49.5 - ((podatoci[i].x + 250) / 10);
            var y = 35.5 - ((podatoci[i].y + 30) / 10);

            var row = Math.floor(y/3);
            var column = Math.floor(x/5);

            if (podatoci[i].made == 1){
                matrix[column][row]+=1;
                if (matrix[column][row] > max){
                    max = matrix[column][row];
                }
            }
        }

        max = 20;

        for (var i=0; i<10; i++){
            for (var j=0; j<12; j++){

                var colorPercent = 0;

                if (matrix[i][j] < 20)
                    var colorPercent = 1 - (matrix[i][j]/max);
                var fieldColor = shadeBlend(colorPercent, color1);


                base.append("rect")
                    .attr("x", i*5)
                    .attr("y", j*3)
                    .attr("width", 5)
                    .attr("height", 3)
                    .style("stroke", fieldColor)
                    .style("fill", fieldColor)
            }
        }

        svgBasketballCourtService.getCourt(base);
    }


    function shadeBlend(p,c0,c1) {
        var n=p<0?p*-1:p,u=Math.round,w=parseInt;
        if(c0.length>7){
            var f=c0.split(","),t=(c1?c1:p<0?"rgb(0,0,0)":"rgb(255,255,255)").split(","),R=w(f[0].slice(4)),G=w(f[1]),B=w(f[2]);
            return "rgb("+(u((w(t[0].slice(4))-R)*n)+R)+","+(u((w(t[1])-G)*n)+G)+","+(u((w(t[2])-B)*n)+B)+")"
        }else{
            var f=w(c0.slice(1),16),t=w((c1?c1:p<0?"#000000":"#FFFFFF").slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF;
            return "#"+(0x1000000+(u(((t>>16)-R1)*n)+R1)*0x10000+(u(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(u(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
        }
    }

}])