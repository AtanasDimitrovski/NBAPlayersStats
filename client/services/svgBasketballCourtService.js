/**
 * Created by Atanas on 29.06.2016.
 */

NbaApp.service('SvgBasketballCourtService', function(){

    this.getCourt = function(base){
      drawCourt(base);
    };

    this.setCourt = function(id){
        return setUpSvg(id);
    };

    opts = {
        // basketball hoop diameter (ft)
        basketDiameter: 1.5,
        // distance from baseline to backboard (ft)
        basketProtrusionLength: 4,
        // backboard width (ft)
        basketWidth: 6,
        // title of hexagon color legend
        colorLegendTitle: 'Efficiency',
        // label for starting of hexagon color range
        colorLegendStartLabel: '< avg',
        // label for ending of hexagon color range
        colorLegendEndLabel: '> avg',
        // full length of basketball court (ft)
        courtLength: 94,
        // full width of basketball court (ft)
        courtWidth: 50,
        // distance from baseline to free throw line (ft)
        freeThrowLineLength: 19,
        // radius of free throw line circle (ft)
        freeThrowCircleRadius: 6,
        // d3 scale for hexagon colors
        heatScale: d3.scale.quantize()
            .domain([0, 1])
            .range(['#5458A2', '#6689BB', '#FADC97', '#F08460', '#B02B48']),
        // height of svg
        height: undefined,
        // method of aggregating points into a bin
        hexagonBin: function (point, bin) {
            var attempts = point.attempts || 1;
            var made = +point.made || 0;
            bin.attempts = (bin.attempts || 0) + attempts;
            bin.made = (bin.made || 0) + made;
        },
        // how many points does a bin need to be visualized
        hexagonBinVisibleThreshold: 1,
        // method to determine value to be used with specified heatScale
        hexagonFillValue: function(d) {  return d.made/d.attempts; },
        // bin size with regards to courth width/height (ft)
        hexagonRadius: .75,
        // discrete hexagon size values that radius value is mapped to
        hexagonRadiusSizes: [0, .4, .6, .75],
        // how many points in a bin to consider it while building radius scale
        hexagonRadiusThreshold: 2,
        // method to determine radius value to be used in radius scale
        hexagonRadiusValue: function (d) { return d.attempts; },
        // width of key marks (dashes on side of the paint) (ft)
        keyMarkWidth: .5,
        // width the key (paint) (ft)
        keyWidth: 16,
        // radius of restricted circle (ft)
        restrictedCircleRadius: 4,
        // title of hexagon size legend
        sizeLegendTitle: 'Frequency',
        // label of start of hexagon size legend
        sizeLegendSmallLabel: 'low',
        // label of end of hexagon size legend
        sizeLegendLargeLabel: 'high',
        // distance from baseline where three point line because circular (ft)
        threePointCutoffLength: 14,
        // distance of three point line from basket (ft)
        threePointRadius: 23.75,
        // distance of corner three point line from basket (ft)
        threePointSideRadius: 22,
        // title of chart
        title: 'Shot chart',
        // method to determine x position of a bin on the court
        translateX: function (d) { return d.x; },
        // method to determine y position of a bin on the court
        translateY: function (d) { return this._visibleCourtLength - d.y; },
        // width of svg
        width: 500
    }


    var o = opts;


    calculateVisibleCourtLength = function () {
        var halfCourtLength = o.courtLength / 2;
        var threePointLength = o.threePointRadius +
            o.basketProtrusionLength;
        o.visibleCourtLength = threePointLength +
            (halfCourtLength - threePointLength) / 2;
    }

    calculateVisibleCourtLength()

// helper to create an arc path
    appendArcPath = function (base, radius, startAngle, endAngle) {
        var points = 30;

        var angle = d3.scale.linear()
            .domain([0, points - 1])
            .range([startAngle, endAngle]);

        var line = d3.svg.line.radial()
            .interpolate("basis")
            .tension(0)
            .radius(radius)
            .angle(function(d, i) { return angle(i); });

        return base.append("path").datum(d3.range(points))
            .attr("d", line);
    }



    var setUpSvg = function(id){
        var base = d3.select('#'+id).append('svg')
            .attr("id", "court")
            .attr('width', o.width)
            .attr('viewBox', "0 0 " + o.courtWidth + " " + o.visibleCourtLength)
            .append('g')
            .attr('class', 'shot-chart-court');
        if (o.height) base.attr('height', o.height);

        return base;
    }

// draw basketball court
    var drawCourt = function (base) {

        base.append("rect")
            .attr('class', 'shot-chart-court-key')
            .attr("x", (o.courtWidth / 2 - o.keyWidth / 2))
            .attr("y", (o.visibleCourtLength - o.freeThrowLineLength))
            .attr("width", o.keyWidth)
            .attr("height", o.freeThrowLineLength)
            .attr("stroke-width", 10);

        base.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 50)
            .attr("height", 47)


        base.append("line")
            .attr('class', 'shot-chart-court-baseline')
            .attr("x1", 0)
            .attr("y1", o.visibleCourtLength)
            .attr("x2", o.courtWidth)
            .attr("y2", o.visibleCourtLength);

        var tpAngle = Math.atan(o.threePointSideRadius /
            (o.threePointCutoffLength - o.basketProtrusionLength - o.basketDiameter/2));
        appendArcPath(base, o.threePointRadius, -1 * tpAngle, tpAngle)
            .attr('class', 'shot-chart-court-3pt-line')
            .attr("transform", "translate(" + (o.courtWidth / 2) + ", " +
            (o.visibleCourtLength - o.basketProtrusionLength - o.basketDiameter / 2) +
            ")");

        [1, -1].forEach(function (n) {
            base.append("line")
                .attr('class', 'shot-chart-court-3pt-line')
                .attr("x1", o.courtWidth / 2 + o.threePointSideRadius * n)
                .attr("y1", o.visibleCourtLength - o.threePointCutoffLength)
                .attr("x2", o.courtWidth / 2 + o.threePointSideRadius * n)
                .attr("y2", o.visibleCourtLength);
        });

        appendArcPath(base, o.restrictedCircleRadius, -1 * Math.PI/2, Math.PI/2)
            .attr('class', 'shot-chart-court-restricted-area')
            .attr("transform", "translate(" + (o.courtWidth / 2) + ", " +
            (o.visibleCourtLength - o.basketProtrusionLength - o.basketDiameter / 2) + ")");

        appendArcPath(base, o.freeThrowCircleRadius, -1 * Math.PI/2, Math.PI/2)
            .attr('class', 'shot-chart-court-ft-circle-top')
            .attr("transform", "translate(" + (o.courtWidth / 2) + ", " +
            (o.visibleCourtLength - o.freeThrowLineLength) + ")");

        appendArcPath(base, o.freeThrowCircleRadius, Math.PI/2, 1.5 * Math.PI)
            .attr('class', 'shot-chart-court-ft-circle-bottom')
            .attr("transform", "translate(" + (o.courtWidth / 2) + ", " +
            (o.visibleCourtLength - o.freeThrowLineLength) + ")");

        [7, 8, 11, 14].forEach(function (mark) {
            [1, -1].forEach(function (n) {
                base.append("line")
                    .attr('class', 'shot-chart-court-key-mark')
                    .attr("x1", o.courtWidth / 2 + o.keyWidth / 2 * n + o.keyMarkWidth * n)
                    .attr("y1", o.visibleCourtLength - mark)
                    .attr("x2", o.courtWidth / 2 + o.keyWidth / 2 * n)
                    .attr("y2", o.visibleCourtLength - mark)
            });
        });

        base.append("line")
            .attr('class', 'shot-chart-court-backboard')
            .attr("x1", o.courtWidth / 2 - o.basketWidth / 2)
            .attr("y1", o.visibleCourtLength - o.basketProtrusionLength)
            .attr("x2", o.courtWidth / 2 + o.basketWidth / 2)
            .attr("y2", o.visibleCourtLength - o.basketProtrusionLength)

        base.append("circle")
            .attr('class', 'shot-chart-court-hoop')
            .attr("cx", o.courtWidth / 2)
            .attr("cy", o.visibleCourtLength - o.basketProtrusionLength - o.basketDiameter / 2)
            .attr("r", o.basketDiameter / 2)


    }
})