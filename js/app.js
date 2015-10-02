(function(){

  /*global angular */
  /*jshint unused:false */
  'use strict';

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
  angular.module('todomvc', ['ngRoute'])
    .config(function($routeProvider){
      $routeProvider
        .when('/', {
          templateUrl: 'templates/todo.html',
          controller: 'TodoCtrl'
        })
        .otherwise({redirectTo: '/'});
    });


}());
