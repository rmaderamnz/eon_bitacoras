'use strict';

angular.module('proyectos').controller('ProyectosController', ['$scope','$uibModal', '$http','$mdDialog', '$mdMedia', 'Privilegios',
	function($scope, $uibModal, $http, $mdDialog, $mdMedia, Privilegios) {
		$scope.proyectos = [];
		$scope.loading = true;
		$scope.permisos = Privilegios;

		$scope.getProyectos = function(){
			 $http.get('/proyectos/list' ).success(function(response) {
			 	//console.log(response);
			 	$scope.proyectos = [];
				for(var k in response) {
					$scope.proyectos.push(response[k]);
					$scope.getNombreUsuario($scope.proyectos[k].usuario, k);
				}
				$scope.loading = false;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.getNombreUsuario = function( id , index){
			 $http.get('/users/getUser/' + id ).success(function(response) {
			 	$scope.proyectos[index].usuario = response.username;
			}).error(function(response) {
				console.log(response);
				//$scope.error = response.message;
			});
		};

		$scope.getProyectos();

		$scope.borrarProyecto = function(ev, idProyecto, nombreProyecto) {
			//console.log(idProyecto);
		    var alert = $mdDialog.confirm()
		        .title('Borrar proyecto')
		        .content('¿Desea borrar permanentemente el proyecto "'+nombreProyecto+'"? ')
		        .ok('Si')
		        .cancel('No');
		    $mdDialog
		        .show( alert )
		        .then(function() {
		        	$http.delete('/proyectos/' + idProyecto ).success(function(response) {
		        		alert = $mdDialog.alert()
					        .title('Proyecto borrado exitosamente')
					        .content('El proyecto fue borrado exitosamente')
					        .ok('Cerrar');
					   	$mdDialog
							.show( alert )
							.finally(function() {
								alert = undefined;
							});
						$scope.loading = true;
						$scope.getProyectos();
					}).error(function(response) {

						console.log(response);
						alert = $mdDialog.alert()
					        .title('Error')
					        .content('Ha ocurrido un error')
					        .ok('Cerrar');
					    $mdDialog
							.show( alert )
							.finally(function() {
								alert = undefined;
							});
					});
					 
		        }, function(){
		        	//No
		          	
		        });
	  	};
		
		$scope.ModalProyectoOpen = function ( parametros ) {

		    var uibModalInstance = $uibModal.open({
		    	animation: true,
				templateUrl: 'modules/proyectos/views/modal-newproyect.client.view.html',
				controller: function($scope, $uibModalInstance){
					$scope.submit_text = 'Crear proyecto';
					$scope.header_text = 'Nuevo proyecto';
					//$scope.proyect = [];

					if(parametros !== undefined){

						$scope.submit_text = 'Actualizar proyecto';
						$scope.header_text = 'Proyecto';
						$http.post('/proyectos/' + parametros ).success(function(response) {
						 	$scope.proyect = response;
						}).error(function(response) {
							var alert = $mdDialog.alert()
							        .title('Error')
							        .content('Ha ocurrido un error al cargar los datos del proyecto')
							        .ok('Cerrar');
							   	$mdDialog
									.show( alert )
									.finally(function() {
										alert = undefined;
									});
							console.log(response);
						});
					}

					$scope.NuevoProyecto = function() {
						if(parametros !== undefined){
							$http.put('/proyectos/' + parametros , $scope.proyect).success(function(response) {
								$uibModalInstance.dismiss('cancel');
								var alert = $mdDialog.alert()
								    .title('Exito')
								    .content('El proyecto fue actualizado exitosamente')
								    .ok('Cerrar');
								$mdDialog
									.show( alert )
									.finally(function() {
										alert = undefined;
									});
								
							}).error(function(response) {
								$scope.error = response.message;
							});
						}else{
							$http.post('/proyectos/save', $scope.proyect).success(function(response) {
								//console.log(response);
								var alert = $mdDialog.alert()
							        .title('Exito')
							        .content('El proyecto fue creado exitosamente')
							        .ok('Cerrar');
							   	$mdDialog
									.show( alert )
									.finally(function() {
										alert = undefined;
									});
							}).error(function(response) {
								$scope.error = response.message;
							});
						}
						$uibModalInstance.dismiss('cancel');
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
	    		$scope.loading = true;
	    		$scope.getProyectos();
	      		//$log.info('Modal dismissed at: ' + new Date());
	    	});
	  	};


	}
]);