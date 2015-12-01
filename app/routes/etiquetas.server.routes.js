'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
	var tag = require('../../app/controllers/etiquetas.server.controller');

	app.route('/etiqueta/proyecto/:proyectIdtag')
		.post(tag.read)
		.delete(tag.delete);

	app.route('/etiqueta/tarea/:taskIdtag')
		.post(tag.read)
		.delete(tag.delete);
	//app.route('/etiqueta/:tareaId').post(tag.read);
	app.route('/etiquetas/save').post(tag.create);

	app.param('proyectIdtag', tag.getByProyect);
	app.param('taskIdtag', tag.getByTask);
	//app.param('tareaId', tag.getById);
};