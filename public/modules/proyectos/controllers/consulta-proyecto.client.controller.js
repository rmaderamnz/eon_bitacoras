'use strict';

angular.module('proyectos').controller('ConsultaProyectoController', ['$scope', '$uibModal', '$http',
	function($scope, $uibModal, $http) {
		// Consulta proyecto controller logic
		// ...

		$scope.ModalEtiquetasOpen = function () {
		    var uibModalInstance = $uibModal.open({
		    	animation: true,
				templateUrl: 'modules/proyectos/views/modal-newtag.client.view.html',
				controller: function($scope, $uibModalInstance){

					$scope.NuevaEtiqueta = function() {
						$http.post('/etiquetas/save', $scope.tag).success(function(response) {
							//console.log(response);
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