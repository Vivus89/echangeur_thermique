'use strict';



/**
 * @ngdoc overview
 * @name echangeurApp
 * @description
 * # echangeurApp
 *
 * Main module of the application.
 */
angular
  .module('echangeurApp', [
    'ngResource',
    'ngRoute',
    



  ])
  .config(function($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
  //  $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";


    $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    $routeProvider.when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl',
      controllerAs: 'about'
    })
    $routeProvider.when('/calcul_thermique', {
      templateUrl: 'views/calcul_thermique.html',
      controller: 'CalculThermiqueCtrl',
      controllerAs: 'calculThermique'
    })
    $routeProvider.otherwise({
      redirectTo: '/'
    });





  });
