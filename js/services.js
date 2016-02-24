angular.module('services', []).service('navService', function(){
    var nav = {
        times: {isActive: false, name:"times", url:"#times", text:"Date and zip code",order:1},
        details: {isActive: false, name:"details", url:"#details",text:"Cleaning Details",order:2},
        address: {isActive: false, name:"address", url:"#address",text:"Address",order:3},
        payment: {isActive: false, name:"payment", url:"#payment",text:"Payment",order:4}
    };

    var active = 'times';

    var navManager = {
        updateActive: function(selected){
            if( nav[active] ) {
                nav[active].isActive = false;
            }

            active = selected;

            if(nav[active]){
                nav[active].isActive = true;    
                return nav[active];
            }
            return;
        },
        getNavigation: function() {
            return nav;
        }
    }

    return navManager;
})
.service('valuesService', function(){
    var appData = {
        date:'',
        time:'',
        zip:'',
        duration:'',
        frequency:''
    };
    return appData;
})