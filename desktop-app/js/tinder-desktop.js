(function() {
  var app = angular.module('tinder-desktop', ['tinder-desktop.login', 'tinder-desktop.swipe', 'tinder-desktop.messages', 'tinder-desktop.profile','tinder-desktop.discovery', 'ngRoute', 'tinder-desktop.settings', 'tinder-desktop.controls', 'tinder-desktop.common', 'pascalprecht.translate']);
  var remote = require('remote');
  app.factory('Cache', function($cacheFactory) {
   var cache = $cacheFactory('Cache');
   cache.put('locationUpdated',false);
   return cache;
  });
  
  app.config(function($routeProvider) {
    var capitalize = function (s) { return s[0].toUpperCase() + s.slice(1); };

    ['/login', '/swipe/', '/messages', '/profile/:userId', '/settings', '/discovery'].forEach(function(route) {
      var name = route.split('/')[1];
      $routeProvider.when(route, {
        templateUrl: 'templates/'  + name + '.html',
        controller: capitalize(name) + 'Controller'
      });
    });
  });

  app.config(['$translateProvider', function($translateProvider) {
    $translateProvider
      .useStaticFilesLoader({
        prefix: 'locales/',
        suffix: '.json'
      })
      .registerAvailableLanguageKeys(['en', 'fr', 'nl'], {
        'en-*': 'en',
        'fr-*': 'fr',
        'nl-*': 'nl'
      })
      .useSanitizeValueStrategy('escape')
      .uniformLanguageTag('bcp47')
      .determinePreferredLanguage()
      .fallbackLanguage('en');
  }]);

  app.run(function($location, Settings, Controls, Cache) {
    var firstPage = (localStorage.tinderToken ? Settings.get('landingPage') : '/login');
    moment.locale(remote.getGlobal('sharedObject').locale);
    Cache.put('currentPage',firstPage.split('/')[1]);
    $location.path(firstPage);
    Controls.init();
  });
})();
