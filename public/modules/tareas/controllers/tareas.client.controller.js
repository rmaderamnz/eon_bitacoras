'use strict';

angular.module('tareas').controller('TareasController', ['$scope', '$location' ,'$uibModal','Authentication', '$http','$mdDialog', '$mdMedia','Privilegios',
	function($scope, $location ,$uibModal, Authentication, $http, $mdDialog, $mdMedia, Privilegios) {

		$scope.permisos = Privilegios;
		$scope.authentication = Authentication;

		if (!$scope.authentication.user){
			$location.path('/login');
		}

		$scope.loading = true;
		$scope.estados = ['Espera','Proceso','Pausa','Terminada','Cancelada'];
		$scope.tabIndex = 0;
		$scope.tareas = [];
		$scope.showstatus = true;

		$scope.CargarTabla = function(tabla){
			$scope.loading = true;
			$scope.tareas = [];
			$scope.showstatus = true;
			$scope.tabIndex = tabla;
			if(tabla === 0){
				$http.get('/tareas/list/' ).success(function(response) {
					 	for(var k in response) {
							$scope.tareas.push(response[k]);
						}
						$scope.loading = false;
						//console.log($scope.tareas);
					}).error(function(response) {
						console.log(response);
				});
			}else if(tabla === 6){
				console.log('Amigos');
			}else{
				$scope.showstatus = false;
				//console.log('Estado: ' + $scope.estados[tabla-1]);
				$http.post('/tareas/status/' + $scope.estados[tabla-1] ).success(function(response) {
					 	for(var k in response) {
							$scope.tareas.push(response[k]);
						}
						$scope.loading = false;
						//console.log($scope.tareas);
					}).error(function(response) {
						console.log(response);
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
	    		$scope.CargarTabla($scope.tabIndex);
	      		//$log.info('Modal dismissed at: ' + new Date());
	    	});
	  	};
	  	//Fin modal
	}
]);