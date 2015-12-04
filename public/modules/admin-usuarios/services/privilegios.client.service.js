'use strict';

angular.module('admin-usuarios').factory('Privilegios', [
	function( ) {

		var permisos = {};
		var asignacion = false;

		return {
			setPermisos: function (privilegios){
				//console.log('Llamada de asignacion:');
				//console.log(privilegios);
				this.asignacion = true;
				this.permisos = privilegios;
			},
			getPermisos : function(){
				//console.log('Llamada de valores');
				//console.log(this.permisos);
				return this.permisos;
			},
			getAsignacion : function (){
				//console.log(this.asignacion);
				return this.asignacion;
			},
			flush : function(){
				//console.log('flush');
				this.asignacion = false;
				this.permisos = {};
			},
			verificarPrivilegio : function(modulo, permiso, actualizacion){
				//console.log('Verificando privilegio '+ permiso +' de ' +modulo);
				if(this.asignacion){
					//console.log('verificando....');
					for( var k in this.permisos){
						if(this.permisos[k].modulo.nombre === modulo){
							if(actualizacion !== undefined){
								if(this.permisos[k].privilegios[permiso][actualizacion]){
									return true;
								}
							}else{
								if(this.permisos[k].privilegios[permiso]){
									return true;
								}
							}
							
						}
					}
				}else{
					return false;
				}
			}
		};
	}
]);