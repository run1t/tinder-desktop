(function() {
  var module = angular.module('tinder-desktop.common', []);
  
  module.controller('MenuController', function($scope, Cache) {
    
    $scope.selected = Cache.get('currentPage');
    
    $scope.getCookie = function(cookieName) {
      return localStorage[cookieName];
    };
    
    $scope.selectPage = function(id){
      $scope.selected = Cache.put('currentPage',id);
      console.log($scope.selected);
    };
    
    $scope.init = function (){
      var a = document.querySelectorAll('a');
      for(var i = 0; i < a.length; i++){
        console.log(a[i]);
        if(a[i].querySelector('div')){
          console.log(a[i].getAttribute('href').split('/')[1],Cache.get('currentPage'));
          if(a[i].getAttribute('href').split('/')[1] === Cache.get('currentPage')){  
          a[i].querySelector('div').className = 'menu-item activate';
          }else{
            a[i].querySelector('div').className = "menu-item";
          }
        }
      }
    }
  });
  
  module.filter('distanceToUnits', function(Settings) {
    return function(distanceMi) {
      if (Settings.get('distanceUnits') == 'mi') {
        return distanceMi + ' mi';
      } else {
        return Math.round(distanceMi * 1.60934) + ' km';
      }
    };
  });

  module.filter('bdayToAge', function() {
    return function(bday) {
      return moment.duration(moment().diff(moment(bday))).years();
    };
  });

  module.filter('timeFromNow', function() {
    return function(time) {
      return moment(time).fromNow();
    };
  });

  module.filter('timeToLocalized', function () {
    return function(time) {
      return moment(time).format('L HH:mm');
    };
  });
})();
