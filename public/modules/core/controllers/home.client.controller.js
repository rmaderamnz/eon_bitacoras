'use strict';


angular.module('core').controller('HomeController', ['$scope', '$location', '$http','Authentication',
	function($scope, $location, $http , Authentication) {

		// This provides Authentication context.
		$scope.authentication = Authentication;

		if (!$scope.authentication.user){
			$location.path('/login');
		}else{
			$location.path('/main');
		}

		//Logica del dashboard
		$scope.loading = true;
		$scope.proyectos = [];
		$scope.tareas = [];
		$scope.view = 0; //0 - Tareas, 1 - Proyectos
		$scope.taskview = 1; //1 - Asignadas, 2 - Creadas, 3 - Terminadas

		//console.log($scope.authentication.user);

		$scope.cargarDatos =function(vista, subvista){
			$scope.loading = true;
			if(vista === 0){
				//Tareas
				if(subvista===1){
					$scope.getTareas(true);
				}else{
					$scope.getTareas(false);
				}
				$scope.loading = false;
			}else{
				//Proyectos
				$scope.getProyectos();
			}
			$scope.view = vista;
		};

		$scope.getProyectos = function(){
			 $http.get('/proyectos/list/' + $scope.authentication.user._id ).success(function(response) {
			 	$scope.proyectos = response;
				$scope.loading = false;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		///tareas/user/asigned/:AsignedUserId'
		$scope.getTareas = function(asigned){
			if(asigned){
				$http.post('/tareas/user/asigned/' + $scope.authentication.user._id ).success(function(response) {
				 	$scope.tareas = response;
				 	$scope.loading = false;
				}).error(function(response) {
					$scope.error = response.message;
				});
			}else{
				$http.post('/tareas/user/created/' + $scope.authentication.user._id ).success(function(response) {
				 	$scope.tareas = response;
				 	$scope.loading = false;
				}).error(function(response) {
					$scope.error = response.message;
				});
			}
				
		};

	}
]);