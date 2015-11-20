'use strict';

module.exports = function(app) {

	var users = require('../../app/controllers/users.server.controller');
	var modulo = require('../../app/controllers/modulo.server.controller');

	app.route('/modulos').get(modulo.read);
	app.route('/modulos/save').get(modulo.create);

	/*
	var users = require('../../app/controllers/users.server.controller');
	var consultas = require('../../app/controllers/consultas.server.controller');

	// Consultas Routes
	app.route('/consultas')
		.get(consultas.list)
		.post(users.requiresLogin, consultas.create);

	app.route('/consultas/:consultaId')
		.get(consultas.read)
		.put(users.requiresLogin, consultas.hasAuthorization, consultas.update)
		.delete(users.requiresLogin, consultas.hasAuthorization, consultas.delete);

	// Finish by binding the Consulta middleware
	app.param('consultaId', consultas.consultaByID);
	*/
};