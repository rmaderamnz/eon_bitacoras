'use strict';

angular.module('admin-usuarios').controller('AdminUsuariosController', ['$scope','$http', '$uibModal','$mdDialog','$log','$location', 'Authentication',
	function($scope, $http, $uibModal, $mdDialog, $log, $location, Authentication) {
		$scope.authentication = Authentication;
		$scope.usuarios = [];
		$scope.tareas = [];
		$scope.lista_privilegios = [];
		$scope.id_usuario = '';
		$scope.nombre_usuario = 'N/A';
		$scope.loading = true;
		$scope.loadusers = true;

		if (!$scope.authentication.user){
			$location.path('/login');
		} 

		$scope.setPrivilegios = function( id_user , name_user){
			$scope.loading = true;
			$scope.id_usuario = id_user;
			$scope.nombre_usuario = name_user;
			$http.post('/tareas/user/asigned/' + id_user ).success(function(response) {
			 	$scope.tareas = response;
			 	$scope.loading = false;
			}).error(function(response) {
				$scope.error = response.message;
			});

			$http.post('/privilegios/' + id_user ).success(function(response) {
				//console.log(response);
			 	$scope.lista_privilegios = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.borrarPrivilegio = function(idPrivilegio){

			var alert = $mdDialog.confirm()
		        .title('Quitar privilegios')
		        .content('¿Desea remover los privilegios al usuario ' + $scope.nombre_usuario + '? ')
		        .ok('Si')
		        .cancel('No');
		    $mdDialog
		        .show( alert )
		        .then(function() {
		        	$http.delete('/privilegios/delete/' + idPrivilegio ).success(function(response) {
		        		alert = $mdDialog.alert()
					        .title('Privilegios removidos')
					        .content('Los privilegios fueron removidos con exito')
					        .ok('Cerrar');
					   	$mdDialog
							.show( alert )
							.finally(function() {
								alert = undefined;
							});
						$scope.setPrivilegios($scope.id_usuario, $scope.nombre_usuario);
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

		//   /privilegios/delete/:PrivId

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
	    		$scope.getUsuarios();
	      		//$log.info('Modal dismissed at: ' + new Date());
	    	});
	  	};


	  	//Modal de privilegios
	  	$scope.ModalPrivilegiosOpen = function () {
	  		var id_user = $scope.id_usuario;
	  		var username = $scope.nombre_usuario;

		    var uibModalInstance = $uibModal.open({
		    	animation: true,
				templateUrl: 'modules/admin-usuarios/views/modal-setpermission.client.view.html',
				controller: function($scope, $uibModalInstance){
					//console.log(username);
					//console.log(id_user);
					$scope.usuario = {id : id_user, nombre : username};
					$scope.modulos = [];
					$scope.modulo_tareas = false;
					$scope.privilegios = [];

					$scope.getModulos = function(){
						 $http.get('/modulos' ).success(function(response) {
						 	//console.log(response);
							for(var k in response) {
								$scope.modulos.push(response[k]);
							}
						}).error(function(response) {
							$scope.error = response.message;
						});
					};
					$scope.getModulos();

					$scope.checkModulo = function(){
						//console.log($scope.privilegios);
						var json = JSON.parse($scope.seleccion);
						if(json.nombre ==='Tareas'){
							$scope.modulo_tareas = true;
						}else{
							$scope.modulo_tareas = false;
						}
						$scope.privilegios = [];
					};

					$scope.savePrivilegios = function(){
						$scope.priv.modulo = JSON.parse($scope.seleccion);
						$scope.priv.usuario = id_user;
						//console.log($scope.priv);

						$http.post('/privilegios/save', $scope.priv ).success(function(response) {
							//console.log(response);
							$uibModalInstance.dismiss('cancel');
						}).error(function(response) {
							$scope.error = response.message;
							console.log($scope.error);
						});

					};

					$scope.checkResults = [];

					$scope.cancel = function () {
					    $uibModalInstance.dismiss('cancel');
					 };
				},
		      	resolve: {
		        	items: function () {
		        		//console.log($scope.items);
		          		return $scope.items;
		        	}
		      	}
		    });

	    uibModalInstance.result.then(function (selectedItem) {
			//$scope.selected = selectedItem;
	    	}, function () {
	    		$scope.setPrivilegios($scope.id_usuario, $scope.nombre_usuario);
	      		//$log.info('Modal dismissed at: ' + new Date());
	    	});
	  	};//Fin modal


		///privilegios/save

		$scope.getUsuarios = function(){
			 $http.get('/users/list' ).success(function(response) {
			 	$scope.usuarios = response;
					/*for(var k in response) {
						$scope.usuarios.push(response[k]);
					}*/
					$scope.loadusers = false;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.getUsuarios();
	}

]);
