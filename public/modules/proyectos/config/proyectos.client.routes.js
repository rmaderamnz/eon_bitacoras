'use strict';

//Setting up route
angular.module('proyectos').config(['$stateProvider',
	function($stateProvider) {
		// Proyectos state routing
		$stateProvider.
		state('proyectos', {
			url: '/proyectos',
			templateUrl: 'modules/proyectos/views/proyectos.client.view.html'
		});
	}
]);