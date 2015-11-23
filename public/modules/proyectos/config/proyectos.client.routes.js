'use strict';

//Setting up route
angular.module('proyectos').config(['$stateProvider',
	function($stateProvider) {
		// Proyectos state routing
		$stateProvider.
		state('proyectos', {
			url: '/consulta-proyectos',
			templateUrl: 'modules/proyectos/views/proyectos.client.view.html'
		}).
		state('proyecto', {
			url: '/view-proyect',
			templateUrl: 'modules/proyectos/views/consulta-proyecto.client.view.html'
		});
	}
]);