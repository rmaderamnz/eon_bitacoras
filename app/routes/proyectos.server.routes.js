'use strict';

module.exports = function(app) {

	var proyect = require('../../app/controllers/proyectos.server.controller');

	app.route('/proyectos/list').get(proyect.getList);
	app.route('/proyectos/save').post(proyect.create);

	app.route('/proyectos/view/:proyectId').post(proyect.read);

	/*
	app.route('/consultas/:consultaId')
		.get(consultas.read)
		.put(users.requiresLogin, consultas.hasAuthorization, consultas.update)
		.delete(users.requiresLogin, consultas.hasAuthorization, consultas.delete);
	*/
	app.param('proyectId', proyect.proyectByID);
};