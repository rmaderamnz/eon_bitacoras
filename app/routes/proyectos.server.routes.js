'use strict';

module.exports = function(app) {

	var proyect = require('../../app/controllers/proyectos.server.controller');

	app.route('/proyectos/list').get(proyect.getList);
	app.route('/proyectos/save').post(proyect.create);
	app.route('/proyectos/update').post(proyect.update);

	app.route('/proyectos/:proyectId')
		.post(proyect.read)
		.delete(proyect.delete)
		.put(proyect.update);

	app.route('/proyectos/list/:ProyectUserId')
		.get(proyect.read);

	app.param('proyectId', proyect.proyectByID);
	app.param('ProyectUserId', proyect.proyectByUserID);
};