'use strict';

angular.module('tareas').controller('ConsultaTareaController', ['$scope', '$location', '$uibModal', '$stateParams', '$http', '$mdDialog','Authentication','Privilegios',
	function($scope, $location, $uibModal, $stateParams, $http, $mdDialog , Authentication, Privilegios) {

		$scope.permisos = Privilegios;
		$scope.authentication = Authentication;

		if (!$scope.authentication.user){
			$location.path('/login');
		}

		$scope.tarea = [];
		$scope.tarea_aux = [];
		$scope.etiquetas = [];
		$scope.Cambios = false;

		$scope.usuarios = [];
		$scope.proyectos = [];

		$scope.volver = function(){
			window.history.back();
		};

		$scope.getInfoTarea = function(){
			 $http.post('/tareas/' + $stateParams.taskId ).success(function(response) {
			 	//console.log(response);
			 	$scope.tarea = response;
			 	//$scope.getNombreUsuario($scope.tarea.usuario_creacion);
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

		$scope.guardarCambios = function(){
			$http.put('/tareas/' + $stateParams.taskId , $scope.tarea).success(function(response) {
				$scope.Cambios = false;
				$scope.tarea = response;
				$scope.tarea_aux = angular.copy($scope.tarea);
				var alert = $mdDialog.alert()
					.title('Exito')
					.content('La tarea fue actualizada')
					.ok('Cerrar');
				$mdDialog
					.show( alert )
					.finally(function() {
						alert = undefined;
					});				
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.finalizarTarea = function(tipo){
			var msg;
			if(tipo ==='Terminada'){
				msg = '¿Esta seguro de que desea marcar por terminada la tarea? ';
			}else{
				msg = '¿Esta seguro de que desea cancelar la tarea?';
			}
			var alert = $mdDialog.confirm()
		        .title('Borrar proyecto')
		        .content( msg )
		        .ok('Si')
		        .cancel('No');
		    $mdDialog
		        .show( alert )
		        .then(function() {
		        	//Si
		        	var fecha = new Date();
		        	$scope.tarea.terminado = fecha;
		        	$scope.tarea.status = tipo;
		        	$scope.guardarCambios();
		        }, function(){
		        	//No
		          	
		        });
		};

		$scope.getInfoTarea();

		$scope.getEtiquetas = function(){
			$http.post('/etiqueta/tarea/' + $stateParams.taskId ).success(function(response) {
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
					//$scope.getNombreUsuario(response[k].usuario, k);
					$scope.etiquetas.push(response[k]);
				}
			}).error(function(response) {
				$scope.error = response.message;
				console.log(response);
			});
		};

		$scope.getEtiquetas();

		$scope.borrarEtiqueta = function(idEtiqueta){
			$http.delete('/etiqueta/proyecto/' + idEtiqueta ).success(function(response) {
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

	  	//ASIGNACIONES

	  	//proyectos
	  	$scope.getProyectos = function(){
			$http.get('/proyectos/list' ).success(function(response) {
				$scope.proyectos = [];
				for(var k in response) {
					$scope.proyectos.push(response[k]);
				}
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.addProyecto = function(){
			var json = JSON.parse($scope.proyecto.seleccion);
			if( !$scope.checkProyecto(json.id) )
			{
				$scope.tarea.proyectos.push(json);
				$scope.Cambios = true;
			}
				$scope.proyecto.seleccion = '';
		};

		$scope.checkProyecto = function (proyecto){
			for(var k in $scope.tarea.proyectos) {
				if($scope.tarea.proyectos[k].id === proyecto){
					return true;
				}
			}
			return false;
		};

		$scope.quitarProyecto = function (proyecto){
			$scope.Cambios = true;
			var listado = [];
			for(var k in $scope.tarea.proyectos) {
				if($scope.tarea.proyectos[k].id !== proyecto){
					listado.push($scope.tarea.proyectos[k]);
				}
			}
			$scope.tarea.proyectos = listado;
		};

		if($scope.permisos.verificarPrivilegio('Proyectos','read')){
			$scope.getProyectos();
		}
		

		//usuarios
		$scope.getUsuarios = function(){
			$http.get('/users/list' ).success(function(response) {
				for(var k in response) {
					$scope.usuarios.push(response[k]);
				}
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.addUsuario = function(){
			var json = JSON.parse($scope.usuario.seleccion);
			if( !$scope.checkUsuario(json.id) ) {
				$scope.Cambios = true;
				$scope.tarea.usuarios_asignados.push(json);
			}
			$scope.usuario.seleccion = '';
		};

		$scope.checkUsuario = function (usuario){
			for(var k in $scope.tarea.usuarios_asignados) {
				if($scope.tarea.usuarios_asignados[k].id === usuario){
					return true;
				}
			}
			return false;
		};

		$scope.quitarUsuario = function (usuario){
			var listado = [];
			$scope.Cambios = true;
			for(var k in $scope.tarea.usuarios_asignados) {
				if($scope.tarea.usuarios_asignados[k].id !== usuario){
					listado.push($scope.usuarios_asignados[k]);
				}
			}
			$scope.tarea.usuarios_asignados = listado;
		};

		$scope.getUsuarios();

	}
]);