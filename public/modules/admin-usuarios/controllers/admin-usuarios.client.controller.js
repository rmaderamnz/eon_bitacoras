'use strict';

angular.module('admin-usuarios').controller('AdminUsuariosController', ['$scope','$http', '$uibModal','$log','$location', 'Authentication',
	function($scope, $http, $uibModal, $log, $location, Authentication) {
		$scope.authentication = Authentication;
		$scope.usuarios = [];
		$scope.lista_privilegios = [];
		$scope.nombre_usuario = 'N/A';

		if (!$scope.authentication.user){
			$location.path('/login');
		} 

		$scope.setPrivilegios = function( id_user , name_user){
			$scope.nombre_usuario = name_user;

		};

		//MODALES
		$scope.ModalUsuariosOpen = function () {

		    var uibModalInstance = $uibModal.open({
		    	animation: true,
				templateUrl: 'modules/admin-usuarios/views/modal-newuser.client.view.html',
				controller: function($scope, $uibModalInstance){

					$scope.signup = function() {
						$http.post('/auth/signup', $scope.credentials).success(function(response) {
							$uibModalInstance.dismiss('cancel');
							//$location.path('/');
						}).error(function(response) {
							$scope.error = response.message;
						});
					};


					$scope.addModulos = function(){
						 $http.get('/users/list' ).success(function(response) {
								for(var k in response) {
									$scope.usuarios.push(response[k]);
								}
						}).error(function(response) {
							$scope.error = response.message;
						});
					};

					/*
					$scope.getUsuarios = function(){
						 $http.get('/users/list' ).success(function(response) {
								for(var k in response) {
									$scope.usuarios.push(response[k]);
								}
						}).error(function(response) {
							$scope.error = response.message;
						});
					};
					*/

					$scope.cancel = function () {
					    $uibModalInstance.dismiss('cancel');
					 };
				},
		      	resolve: {
		        	items: function () {
		        		console.log($scope.items);
		          		return $scope.items;
		        	}
		      	}
		    });

	    uibModalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
	    	}, function () {
	      		//$log.info('Modal dismissed at: ' + new Date());
	    	});
	  	};


	  	//Modal de privilegios
	  	$scope.ModalPrivilegiosOpen = function () {

		    var uibModalInstance = $uibModal.open({
		    	animation: true,
				templateUrl: 'modules/admin-usuarios/views/modal-setpermission.client.view.html',
				controller: function($scope, $uibModalInstance){

					$scope.reference = 'modulos';

					$scope.checkModel = { //Privilegios
					    create: false,
					    read: false,
					    update: false,
					    delete: false
					};


					$scope.savePrivilegios = function(){
						//var param = [$scope.checkModel, $scope.reference];
						var param = {permisos : $scope.checkModel , referencia: $scope.reference };
						 $http.post('privilegios/save' , param ).success(function(response) {
						 	console.log('Respondieron!');
						 	console.log(response);
								/*for(var k in response) {
									$scope.usuarios.push(response[k]);
								}*/
						}).error(function(response) {
							$scope.error = response.message;
						});
					};

					$scope.checkResults = [];

					$scope.$watchCollection('checkModel', function () {
					    $scope.checkResults = [];
					    angular.forEach($scope.checkModel, function (value, key) {
					      if (value) {
					        $scope.checkResults.push(key);
					      }
					    });
					});

					$scope.cancel = function () {
					    $uibModalInstance.dismiss('cancel');
					 };
				},
		      	resolve: {
		        	items: function () {
		        		console.log($scope.items);
		          		return $scope.items;
		        	}
		      	}
		    });

	    uibModalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
	    	}, function () {
	      		//$log.info('Modal dismissed at: ' + new Date());
	    	});
	  	};//Fin modal


		///privilegios/save

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
