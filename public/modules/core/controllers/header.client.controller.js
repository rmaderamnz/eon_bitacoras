'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$http','Authentication', 'Menus', 'Modulo',
	function($scope, $http, Authentication, Menus, Modulo) {
		$scope.modulos = [];
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.setModulos = function(){
			 $http.get('/modulos' ).success(function(response) {
					for(var k in response) {
						$scope.modulos.push(response[k]);
					}
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
		$scope.setModulos();

	}
]);


