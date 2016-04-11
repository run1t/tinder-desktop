(function() {
  module = angular.module('tinder++.shortcuts', []);

  module.service('Shortcuts', function($location) {

      Mousetrap.bind('command+z', function(evt) {
        evt.preventDefault();
        $location.url('/settings/');
      });

      Mousetrap.bind('command+x', function(evt) {
        evt.preventDefault();
        $location.url('/swipe/');
      });

      Mousetrap.bind('command+c', function(evt) {
        evt.preventDefault();
        $location.url('/messages/');
      });
  });
   

})();