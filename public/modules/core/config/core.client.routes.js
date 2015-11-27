'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('index', {
			url: '/index',
			templateUrl: 'modules/core/views/index.client.view.html'
		}).
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).
		state('dashboard', {
			url: '/main',
			templateUrl: 'modules/core/views/dashboard.client.view.html'
		});
	}
]);