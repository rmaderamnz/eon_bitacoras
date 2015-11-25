'use strict';

angular.module('proyectos').controller('ConsultaProyectoController', ['$scope', '$uibModal', '$stateParams', '$http',
	function($scope, $uibModal, $stateParams, $http) {

		$scope.proyecto = [];

		$scope.volver = function(){
			window.history.back();
		};


		$scope.getInfoProyecto = function(){
			 $http.post('/proyectos/view/' + $stateParams.proyectoId ).success(function(response) {
			 	//$scope.proyectos[index].usuario = response.username;
			 	$scope.proyecto = response;
			 	$scope.getNombreUsuario($scope.proyecto.usuario);
			}).error(function(response) {
				//$scope.error = response.message;
			});
		};

		$scope.getNombreUsuario = function( id ){
			 $http.get('/users/getUser/' + id ).success(function(response) {
			 	//$scope.proyectos[index].usuario = response.username;
			 	$scope.proyecto.usuario = response.username;
			}).error(function(response) {
				//$scope.error = response.message;
			});
		};

		$scope.formatDate = function(){

		};

		$scope.getInfoProyecto();

		$scope.ModalEtiquetasOpen = function (idProyecto) {
		    var uibModalInstance = $uibModal.open({
		    	animation: true,
				templateUrl: 'modules/proyectos/views/modal-newtag.client.view.html',
				controller: function($scope, $uibModalInstance){

					$scope.etiquetas = [];

					$scope.getTagsProyecto = function(){
						 $http.post('/proyectos/view/' + $stateParams.proyectoId ).success(function(response) {
						 	//$scope.proyectos[index].usuario = response.username;
						 	$scope.proyecto = response;
						 	$scope.getNombreUsuario($scope.proyecto.usuario);
						}).error(function(response) {
							//$scope.error = response.message;
						});
					};

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
	      		//$log.info('Modal dismissed at: ' + new Date());
	    	});
	  	};
	}
]);