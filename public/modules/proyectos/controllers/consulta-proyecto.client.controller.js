'use strict';

angular.module('proyectos').controller('ConsultaProyectoController', ['$scope', '$uibModal', '$stateParams', '$http',
	function($scope, $uibModal, $stateParams, $http) {

		$scope.proyecto = [];
		$scope.etiquetas = [];

		$scope.volver = function(){
			window.history.back();
		};

		$scope.getInfoProyecto = function(){
			 $http.post('/proyectos/' + $stateParams.proyectoId ).success(function(response) {
			 	$scope.proyecto = response;
			 	$scope.getNombreUsuario($scope.proyecto.usuario);
			}).error(function(response) {
			});
		};

		$scope.getNombreUsuario = function( id , tag){
			 $http.get('/users/getUser/' + id ).success(function(response) {
			 	if(tag !== undefined){
			 		$scope.etiquetas[tag].nombreusuario = response.username;
			 	}else{
			 		$scope.proyecto.nombreusuario = response.username;
			 	}
			}).error(function(response) {
				console.log(response);
				//$scope.error = response.message;
			});
		};

		$scope.getInfoProyecto();

		//Lista de etiquetas
		

		$scope.getEtiquetas = function(){
			$http.post('/etiqueta/' + $stateParams.proyectoId ).success(function(response) {
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
						$scope.tag.proyecto = $stateParams.proyectoId;
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