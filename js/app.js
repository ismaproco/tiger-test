var app = angular.module("tigerApp", ['ngRoute', 'services']);

app.config(function($routeProvider){
    $routeProvider
    .when('/times', {
        templateUrl: 'templates/times.html',
        controller: 'timesController'
    }).when('/details', {
        templateUrl: 'templates/details.html',
        controller: 'detailsController'
    }).when('/', {
        redirectTo:'/times'
    }).otherwise({
        templateUrl: 'templates/other.html',
        controller: 'defaultController'
    });
});

app.controller('navController',['$scope','$location', 'navService',function($scope, $location, navService){
    var ctrl = this;
    $scope.items = [];

    var navigation = navService.getNavigation();
    var navKeys = Object.keys(navigation);
    
    if(navKeys){
        $scope.items = navKeys.map(function(key){
            return navigation[key];
        });
    }

    $scope.$location = $location;
    $scope.$watch('$location.path()', function(newValue){
        var value = newValue.split('/');
        console.log(navigation);
        navService.updateActive(value[1]);
    });
}]);

app.controller('timesController',function($scope, $route, $routeParams, $location){
    $scope.dateList = { isOpen:false, items:[] };
    $scope.selectedDate = "";

    $scope.toggleDatesList = function(){
        $scope.dateList.isOpen = !$scope.dateList.isOpen;
        console.log($scope.dateList.isOpen);
    }

    /* dates methods*/
    function getDates(){
        var date = new Date();

        var arrDates = [];
        for(var i = 0; i < 365; i++){
            arrDates.push(date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() );
            date.setTime( date.getTime() + 1 * 86400000 );
        }
        return arrDates;
    }
    
    getDates().forEach(function(date){
        $scope.dateList.items.push({text:date});
    });

    $scope.dateList.selectedDate = function(date) {
        console.log(date);
        $scope.selectedDate = date;
        $scope.dateList.isOpen = false;
    }

    /* times methods */
    
});

app.controller('detailsController', function($scope) {

});

app.controller('defaultController', function($scope) {

});