'use strict';

angular.module('admin-usuarios').controller('AdminUsuariosController', ['$scope','$http', '$modal','$log','$location', 'Authentication',
	function($scope, $http, $modal, $log, $location, Authentication) {
		$scope.authentication = Authentication;
		$scope.usuarios = [];

		if (!$scope.authentication.user){
			$location.path('/login');
		} 

		//MODAL
		$scope.ModalOpen = function () {

		    var modalInstance = $modal.open({
		    	animation: true,
				templateUrl: 'modules/admin-usuarios/views/modal-newuser.client.view.html',
				controller: function($scope, $modalInstance){

					$scope.signup = function() {
						$http.post('/auth/signup', $scope.credentials).success(function(response) {
							$modalInstance.dismiss('cancel');
							//$location.path('/');
						}).error(function(response) {
							$scope.error = response.message;
						});
					};

					$scope.cancel = function () {
					    $modalInstance.dismiss('cancel');
					 };
				},
		      	resolve: {
		        	items: function () {
		        		console.log($scope.items);
		          		return $scope.items;
		        	}
		      	}
		    });

	    modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
	    	}, function () {
	      		//$log.info('Modal dismissed at: ' + new Date());
	    	});
	  	};//Fin modal


		//users/list

		$scope.getUsuarios = function(){
			 $http.get('/users/list' ).success(function(response) {
					for(var k in response) {
						$scope.usuarios.push(response[k]);
					}
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
		$scope.getUsuarios();
	}

]);
