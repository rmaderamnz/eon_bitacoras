'use strict';

angular.module('proyectos').controller('ProyectosController', ['$scope','$uibModal', '$http',
	function($scope, $uibModal, $http) {
		$scope.proyectos = [];

		$scope.getProyectos = function(){
			 $http.get('/proyectos/list' ).success(function(response) {
			 	//console.log(response);
			 	$scope.proyectos = [];
					for(var k in response) {
						$scope.proyectos.push(response[k]);
						$scope.getNombreUsuario($scope.proyectos[k].usuario, k);
					}
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.getProyectos();

		$scope.getNombreUsuario = function( id , index){
			 $http.get('/users/getUser/' + id ).success(function(response) {
			 	$scope.proyectos[index].usuario = response.username;
			}).error(function(response) {
				//$scope.error = response.message;
			});
		};


		// /proyectos/list
		
		$scope.ModalProyectoOpen = function () {
		    var uibModalInstance = $uibModal.open({
		    	animation: true,
				templateUrl: 'modules/proyectos/views/modal-newproyect.client.view.html',
				controller: function($scope, $uibModalInstance){

					$scope.NuevoProyecto = function() {
						$http.post('/proyectos/save', $scope.proyect).success(function(response) {
							console.log(response);
							$uibModalInstance.dismiss('cancel');
							//$location.path('/');
						}).error(function(response) {
							$scope.error = response.message;
						});
					};

					$scope.ActualizarProyecto = function() {
						$http.post('/proyectos/update', $scope.proyect).success(function(response) {
							console.log(response);
							$uibModalInstance.dismiss('cancel');
							//$location.path('/');
						}).error(function(response) {
							$scope.error = response.message;
						});
					};

					$scope.cancel = function () {
					    $uibModalInstance.dismiss('cancel');
					 };
				},
		      	resolve: {
		        	items: function () {
		          		return $scope.items;
		        	}
		      	}
		    });

	    uibModalInstance.result.then(function () {
	    	}, function () {
	    		$scope.getProyectos();
	      		//$log.info('Modal dismissed at: ' + new Date());
	    	});
	  	};


	}
]);