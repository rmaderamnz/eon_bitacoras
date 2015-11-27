'use strict';

//Setting up route
angular.module('tareas').config(['$stateProvider',
	function($stateProvider) {
		// Tareas state routing
		$stateProvider.
		state('tareas', {
			url: '/consulta-tareas',
			templateUrl: 'modules/tareas/views/tareas.client.view.html'
		});
	}
]);