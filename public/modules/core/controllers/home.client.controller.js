'use strict';


angular.module('core').controller('HomeController', ['$scope', '$location', '$uibModal', '$mdDialog', '$http','Authentication','Privilegios',
	function($scope, $location, $uibModal, $mdDialog, $http , Authentication, Privilegios) {

		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.permisos = Privilegios;

		if (!$scope.authentication.user){
			$location.path('/login');
		}else{

			$location.path('/main');
		}

		//Logica del dashboard
		$scope.loading = true;
		$scope.proyectos = [];
		$scope.tareas = [];
		$scope.view = 0; //0 - Tareas, 1 - Proyectos
		$scope.taskview = 1; //1 - Asignadas, 2 - Creadas, 3 - Terminadas

		//console.log($scope.authentication.user);

		$scope.cargarDatos =function(vista, subvista){
			//$scope.permisos.verificarPrivilegio('Proyectos','read');
			//console.log($scope.privilegios);
			$scope.loading = true;
			if(vista === 0){
				//Tareas
				if(subvista===1){
					$scope.getTareas(true);
					$scope.taskview = 1;
				}else{
					$scope.getTareas(false);
					$scope.taskview = 2;
				}
				$scope.loading = false;
			}else{
				//Proyectos
				$scope.getProyectos();
			}
			$scope.view = vista;
		};

		$scope.getProyectos = function(){
			 $http.get('/proyectos/list/' + $scope.authentication.user._id ).success(function(response) {
			 	$scope.proyectos = response;
				$scope.loading = false;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		///tareas/user/asigned/:AsignedUserId'
		$scope.getTareas = function(asigned){
			if(asigned){
				$http.post('/tareas/user/asigned/' + $scope.authentication.user._id ).success(function(response) {
				 	$scope.tareas = response;
				 	$scope.loading = false;
				}).error(function(response) {
					$scope.error = response.message;
				});
			}else{
				$http.post('/tareas/user/created/' + $scope.authentication.user._id ).success(function(response) {
				 	$scope.tareas = response;
				 	$scope.loading = false;
				}).error(function(response) {
					$scope.error = response.message;
				});
			}
		};

		//MODAL DE NUEVAS TAREAS
		$scope.ModalTareasOpen = function (idTarea) {
		    var uibModalInstance = $uibModal.open({
		    	animation: true,
		    	size: 'lg',
				templateUrl: 'modules/tareas/views/modal-newtarea.client.view.html',
				controller: function($scope, $uibModalInstance, Authentication){
					//Controlador

					$scope.authentication = Authentication;

					$scope.errores = [];
					$scope.nuevoError = function(texto) {
						$scope.errores.push({msg: texto });
					};

					$scope.cerrarAlerta = function(index) {
					    $scope.errores.splice(index, 1);
					};

					$scope.usuarios_asignados =[];
					$scope.proyectos_asignados = [];

					$scope.usuarios_asignados.push(JSON.parse('{"id": "'+$scope.authentication.user._id+'" , "nombre": "'+$scope.authentication.user.username+'" }'));

					$scope.usuarios = [];
					$scope.proyectos = [];

					$scope.checkPlanificada = function(){
						//Agrega al usuario actual en caso de no estar asignado previamente
						if($scope.task.tipo === 'Planificada'){
							if(!$scope.checkUsuario($scope.authentication.user._id)){
								var json = JSON.parse('{"id": "'+$scope.authentication.user._id+'" , "nombre": "'+$scope.authentication.user.username+'" }');
								$scope.usuarios_asignados.push(json);
							}
						}
					};

					$scope.NuevaTarea = function(){
						$scope.task.usuarios_asignados = $scope.usuarios_asignados;
						$scope.task.proyectos = $scope.proyectos_asignados;
						$http.post('/tareas/save', $scope.task).success(function(response) {
								//console.log(response);
								$uibModalInstance.dismiss('cancel');
								var alert = $mdDialog.alert()
							        .title('Exito')
							        .content('Tarea creada con exito')
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

					$scope.getProyectos = function(){
						 $http.get('/proyectos/list' ).success(function(response) {
						 	//console.log(response);
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
							$scope.proyectos_asignados.push(json);
						}
						$scope.proyecto.seleccion = '';
					};

					$scope.checkProyecto = function (proyecto){
						for(var k in $scope.proyectos_asignados) {
							if($scope.proyectos_asignados[k].id === proyecto){
								return true;
							}
						}
						return false;
					};

					$scope.quitarProyecto = function (proyecto){
						var listado = [];
						for(var k in $scope.proyectos_asignados) {
							if($scope.proyectos_asignados[k].id !== proyecto){
								listado.push($scope.proyectos_asignados[k]);
							}
						}
						$scope.proyectos_asignados = listado;
					};

					$scope.getProyectos();

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
						if( !$scope.checkUsuario(json.id) )
						{
							$scope.usuarios_asignados.push(json);
						}
						$scope.usuario.seleccion = '';
					};

					$scope.checkUsuario = function (usuario){
						for(var k in $scope.usuarios_asignados) {
							if($scope.usuarios_asignados[k].id === usuario){
								return true;
							}
						}
						return false;
					};

					$scope.quitarUsuario = function (usuario){
						if( !($scope.task.tipo === 'Planificada' && $scope.authentication.user._id === usuario) ){
							var listado = [];
							for(var k in $scope.usuarios_asignados) {
								if($scope.usuarios_asignados[k].id !== usuario){
									listado.push($scope.usuarios_asignados[k]);
								}
							}
							$scope.usuarios_asignados = listado;
						}else{
							$scope.errores.push(JSON.parse( '{"msg": "En una tarea planificada, el usuario que creo la tarea debe quedar asignado"}'));
						}
						
					};

					$scope.getUsuarios();


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
	    		$scope.cargarDatos($scope.view, $scope.taskview);
	      		//$log.info('Modal dismissed at: ' + new Date());
	    	});
	  	};

	}
]);