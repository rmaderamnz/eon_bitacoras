'use strict';

module.exports = function(app) {

	var proyect = require('../../app/controllers/proyectos.server.controller');
	var users = require('../../app/controllers/users.server.controller');
	var privilegios = require('../../app/controllers/privilegios.server.controller');

	app.route('/proyectos/list', users.requiresLogin).get(privilegios.checkPermiso('Proyectos','read', 'none'), proyect.getList);
	app.route('/proyectos/save', users.requiresLogin ).post( privilegios.checkPermiso('Proyectos','create', 'none'), proyect.create);
	app.route('/proyectos/update', users.requiresLogin ).post(privilegios.checkPermiso('Proyectos','update', 'none'), proyect.update);

	app.route('/proyectos/:proyectId', users.requiresLogin )
		.post(privilegios.checkPermiso('Proyectos','read', 'none'), proyect.read)
		.delete(privilegios.checkPermiso('Proyectos','delete', 'none'), proyect.delete)
		.put(privilegios.checkPermiso('Proyectos','update', 'none'), proyect.update);

	app.route('/proyectos/list/:ProyectUserId', users.requiresLogin)
		.get(privilegios.checkPermiso('Proyectos','read', 'none'), proyect.read);

	app.param('proyectId', proyect.proyectByID);
	app.param('ProyectUserId', proyect.proyectByUserID);
};