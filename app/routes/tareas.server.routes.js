'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...

	var task = require('../../app/controllers/tareas.server.controller');

	app.route('/tareas/save').post(task.create);
	app.route('/tareas/list').get(task.getList);
	//app.route('/tareas/update').post(task.update);


	app.route('/tareas/:taskId')
		.post(task.read);
	app.route('/tareas/proyect/:ProyectId')
		.post(task.read);
	app.route('/tareas/status/:TaskStatus')
		.post(task.read);
	app.route('/tareas/:taskId')
		.post(task.read);
	/*app.route('/tareas/:taskId')
		.post(task.read)
		.delete(task.delete)
		.put(task.update);

	app.param('taskId', task.proyectByID);*/

	app.param('taskId', task.getByTaskId);
	app.param('ProyectId', task.getByProyect);
	app.param('TaskStatus', task.getByStatus);
};