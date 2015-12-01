'use strict';

angular.module('tareas').controller('ConsultaTareaController', ['$scope', '$uibModal', '$stateParams', '$http',
	function($scope, $uibModal, $stateParams, $http) {

		$scope.tarea = [];
		$scope.tarea_aux = [];
		$scope.etiquetas = [];
		$scope.Cambios = false;

		$scope.volver = function(){
			window.history.back();
		};

		$scope.getInfoTarea = function(){
			 $http.post('/tareas/' + $stateParams.taskId ).success(function(response) {
			 	//console.log(response);
			 	$scope.tarea = response;
			 	$scope.getNombreUsuario($scope.tarea.usuario_creacion);
			 	$scope.tarea_aux = angular.copy($scope.tarea);
				}).error(function(response) {
			});
		};

		$scope.habilitarEdicion = function(){
			$scope.Cambios = true;
		};

		$scope.descartarCambios = function(){
			$scope.Cambios = false;
			$scope.tarea= angular.copy($scope.tarea_aux);
		};

		$scope.getNombreUsuario = function( id , index , task){
			 $http.get('/users/getUser/' + id ).success(function(response) {
			 	if(index !== undefined){
			 		$scope.etiquetas[index].nombreusuario = response.username;
			 	}else{
			 		$scope.tarea.nombreusuario = response.username;
			 	}
			}).error(function(response) {
				console.log(response);
				//$scope.error = response.message;
			});
		};

		$scope.getInfoTarea();

		$scope.getEtiquetas = function(){
			console.log('Sacando etiquetas!');
			console.log($stateParams.taskId);
			$http.post('/etiqueta/tarea/' + $stateParams.taskId ).success(function(response) {
				console.log(response);
				$scope.etiquetas = [];

				for(var k in response) {
					switch(response[k].color) {
						case 'red':
							response[k].tagclass = 'panel-danger'; break;
						case 'yellow':
							response[k].tagclass = 'panel-warning'; break;
						default:
							response[k].tagclass = 'panel-success'; break;
					}
					$scope.getNombreUsuario(response[k].usuario, k);
					$scope.etiquetas.push(response[k]);
				}
			}).error(function(response) {
				$scope.error = response.message;
				console.log(response);
			});
		};

		$scope.getEtiquetas();

		$scope.borrarEtiqueta = function(idEtiqueta){
			$http.delete('/etiqueta/' + idEtiqueta ).success(function(response) {
				$scope.getEtiquetas();
			}).error(function(response) {
				$scope.error = response.message;
				console.log(response);
			});
		};

		$scope.ModalEtiquetasOpen = function (idProyecto) {
		    var uibModalInstance = $uibModal.open({
		    	animation: true,
				templateUrl: 'modules/proyectos/views/modal-newtag.client.view.html',
				controller: function($scope, $uibModalInstance){



					$scope.NuevaEtiqueta = function() {
						$scope.tag.tarea = $stateParams.taskId;
						$http.post('/etiquetas/save', $scope.tag).success(function(response) {
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
	    		$scope.getEtiquetas();
	      		//$log.info('Modal dismissed at: ' + new Date());
	    	});
	  	};

	}
]);