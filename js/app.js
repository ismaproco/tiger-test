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
        navService.updateActive(value[1]);
    });
}]);

app.controller('timesController',['$scope','$location','valuesService',  function($scope, $location, valuesService){
    
    $scope.date = valuesService.date;
    $scope.time = valuesService.time; 

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
    
    $scope.datesData = getDates();

    /* times methods */
    function getTimes() {
        var times = [];
        for (var i = 9; i < 18; i++) {
            times.push(i + ":00");
        }
        return times;
    }

    $scope.timesData = getTimes();
}]);

app.controller('detailsController', ['$scope','$location','valuesService',  function($scope, $location, valuesService){
    function getHours() {
        var hours = [];
        for (var i = 1; i < 12; i++) {
            hours.push(i);
        }
        return hours;
    }

    $scope.hoursData = getHours();

    function getFrecuency() {
        return [
            ['once','from 14,90 € /h'],
            ['weekly','from 13,90 € /h'],
            ['every 2 weeks','from 13,90 € /h'],
            ['every 4 weeks','from 13,90 € /h']
        ];
    }

    $scope.frequencyData = getFrecuency();

    $scope.$watch(function(){return valuesService.frequency},function(value){
        $scope.selectedFrequecy = value;
    });
}]);

app.controller('defaultController', function($scope) {

});

app.controller('toggleInputController', ['$scope', 'valuesService',function($scope, vService) {
    var ctrl = this;
    ctrl.list = [];
    ctrl.selectedValue='';
    ctrl.isOpen = false;

    ctrl.toggle = function(){
        ctrl.isOpen = !ctrl.isOpen;
    };

    ctrl.hide = function(){
        ctrl.isOpen = false;
    };

    ctrl.selectValue = function(value) {
        ctrl.selectedValue = value;
        ctrl.isOpen = false;
        if(vService){
            vService[ctrl.identifier] = value;
        }
    }

    $scope.$watch('ctrl.selectedValue',ctrl.selectValue);

    ctrl.init = function(holder, data, identifier,type){
        ctrl.placeholder = holder;
        ctrl.data = data;
        ctrl.identifier = identifier;
        ctrl.type = type || '';

        if(data && Array.isArray(data)) {
            data.forEach(function(value){
                if(ctrl.type === 'grid'){
                    ctrl.list.push({grid0:value[0], grid1:value[1],text:value[0]});    
                }else{
                    ctrl.list.push({text:value});
                }
            });
        }
        
        if(ctrl.identifier && vService[ctrl.identifier]){
            ctrl.selectedValue = vService[ctrl.identifier];
        }
    };
}]);

app.directive('toggleInput', ['$compile','$parse',function($compile, $parse){
    return {
        scope:true,
        restrict:'E',
        controller: 'toggleInputController',
        controllerAs: 'ctrl',
        bindToController:true,
        templateUrl:'templates/toggleInput.html',
        compile: function(element){
            return function(scope, element, attrs) {
                var holder, data, identifier, type;

                if(attrs.placeholder){
                    holder = attrs.placeholder;    
                }
                
                if(attrs.data){
                    data = $parse(attrs.data)(scope);    
                }

                if(attrs.identifier){
                    identifier =  attrs.identifier;
                }

                if(attrs.type){
                    type =  attrs.type;
                }

                scope.ctrl.init(holder, data, identifier, type);
            }
        }
    }
}]);
