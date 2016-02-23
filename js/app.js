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
    
});

app.controller('detailsController', function($scope) {

});

app.controller('defaultController', function($scope) {

});