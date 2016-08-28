/**
 * Created by Atanas on 29.06.2016.
 */


NbaApp.controller('SideBarController', ['$scope', '$http', '$log', '$location' ,'$mdSidenav', function($scope, $http, $log, $location, $mdSidenav){

    $scope.name = "ATA";

    $scope.players = [];

    $scope.currentPlayer = null;

/*    $http.get('/players').then(function(data){
        $scope.players = data;
    })*/


        var self = this;
        self.simulateQuery = false;
        self.isDisabled    = false;
        // list of `state` value/display objects
       // self.states        = loadAll();
        self.querySearch   = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange   = searchTextChange;
        self.newState = newState;
        function newState(state) {
            alert("Sorry! You'll need to create a Constituion for " + state + " first!");
        }
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */


        function querySearch(text){

            if (text=="" || text == null) {
                console.log("Nema: " + text);
                return $http.get("/players")
                    .then(function (result) {
                        return result.data;
                    })
            }else{
                console.log("Ima: " + text);
                return $http.get("/players?player_name="+text)
                    .then(function (result) {
                        return result.data;
                    })
            }
        }


    function toggleSidenav() {
        $mdSidenav('left').toggle();
    }

    function list(){
        return ['eden', 'dva', 'tri'];
    }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }
        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
            $scope.currentPlayer = item;
            $location.path('/home');
        }


}])