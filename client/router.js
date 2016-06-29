
NbaApp.config(['$routeProvider', function($routeProvider){

    $routeProvider.when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    });

    $routeProvider.when('/shot-chart/:id', {
        templateUrl: 'views/shot-chart.html',
        controller: 'ShotChartController'
    });

    $routeProvider.when('/heatmap/:id', {
        templateUrl: 'views/heatmap.html',
        controller: 'HeatmapController'
    });

    $routeProvider.when('/shot-efficiency/:id', {
        templateUrl: 'views/shot-efficiency.html',
        controller: 'ProbabilityController'
    });

    $routeProvider.when('/buckets/:id', {
        templateUrl: 'views/buckets.html',
        controller: 'BucketsController'
    });


    $routeProvider.otherwise({
        redirectTo : '/'
    });

}]);