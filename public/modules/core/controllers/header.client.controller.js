'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$http','Authentication', 'Menus', 'Modulo', 'Privilegios' ,
	function($scope, $http, Authentication, Menus, Modulo, Privilegios) {
		$scope.modulos = [];
		$scope.authentication = Authentication;

		$scope.setModulos = function(){
			$http.get('/modulos' ).success(function(response) {
				//console.log(response);
				var permisos = Privilegios.getPermisos();
				//console.log(permisos);
					for(var k in response) {
						for(var i in permisos) {
							if(permisos[i].modulo.id === response[k]._id)
							{
								if(permisos[i].privilegios.read){
									$scope.modulos.push(response[k]);
								}
							}
						}
					}
					console.log($scope.modulos);
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.getPermisos = function () {
			if($scope.authentication.user){
				//console.log('Validando');
				$http.post('/privilegios/' + $scope.authentication.user._id ).success(function(response) {
				 	Privilegios.setPermisos(response);
				 	$scope.setModulos();
				 	//console.log( Privilegios.getPermisos() );
				}).error(function(response) {
					$scope.error = response.message;
				});
			}else{
				console.log('Destruyendo privilegios');
				Privilegios.flush();
			}
	    };

		$scope.getPermisos();
		//$scope.setModulos();

	}
]);


