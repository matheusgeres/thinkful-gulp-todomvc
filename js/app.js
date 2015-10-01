/*global angular */
/*jshint unused:false */
'use strict';

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
var todomvc = angular.module('todomvc', ['ngRoute']);

todomvc.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'templates/todo.html',
      controller: 'TodoCtrl'
    })
    .otherwise({redirectTo: '/'});
});
