'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...

	var task = require('../../app/controllers/tareas.server.controller');
	var users = require('../../app/controllers/users.server.controller');
	var privilegios = require('../../app/controllers/privilegios.server.controller');
	//privilegios.checkPermiso('Proyectos','read', 'none')
	app.route('/tareas/save',users.requiresLogin).post(privilegios.checkPermiso('Tareas','create', 'none'), task.create);
	app.route('/tareas/list',users.requiresLogin).get(privilegios.checkPermiso('Tareas','read', 'none'), task.getList);
	//app.route('/tareas/update').post(task.update);


	app.route('/tareas/:taskId', users.requiresLogin)
		.post(privilegios.checkPermiso('Tareas','read', 'none'), task.read);
	app.route('/tareas/proyect/:ProyectId', users.requiresLogin)
		.post(privilegios.checkPermiso('Tareas','read', 'none'), task.read);
	app.route('/tareas/user/created/:UserId', users.requiresLogin)
		.post(privilegios.checkPermiso('Tareas','read', 'none'), task.read);
	app.route('/tareas/user/asigned/:AsignedUserId', users.requiresLogin)
		.post(privilegios.checkPermiso('Tareas','read', 'none'), task.read);
	app.route('/tareas/status/:TaskStatus', users.requiresLogin)
		.post(privilegios.checkPermiso('Tareas','read', 'none'), task.read);
	app.route('/tareas/:taskId', users.requiresLogin)
		.post(privilegios.checkPermiso('Tareas','read', 'none'), task.read)
		.put(privilegios.checkPermiso('Tareas','update', 'Actualizar'), task.update);

	app.param('taskId', task.getByTaskId);
	app.param('ProyectId', task.getByProyect);
	app.param('TaskStatus', task.getByStatus);
	app.param('UserId', task.getByUser);
	app.param('AsignedUserId', task.getByAsignedUser);
};