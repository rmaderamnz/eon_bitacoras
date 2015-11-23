'use strict';

//Setting up route
angular.module('admin-usuarios').config(['$stateProvider',
	function($stateProvider) {
		// Admin usuarios state routing
		$stateProvider.
		state('admin-usuarios', {
			url: '/admin-usuarios',
			templateUrl: 'modules/admin-usuarios/views/admin-usuarios.client.view.html'
		});
	}
]);