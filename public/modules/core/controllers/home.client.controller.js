'use strict';


angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication',
	function($scope, $location, Authentication) {

		// This provides Authentication context.
		$scope.authentication = Authentication;

		if (!$scope.authentication.user){
			$location.path('/login');
		}else{
			$location.path('/main');
		}
		// /main
	}
]);