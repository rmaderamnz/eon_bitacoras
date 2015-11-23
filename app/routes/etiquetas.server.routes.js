'use strict';

module.exports = function(app) {
	// Routing logic   
	// ...
	var tag = require('../../app/controllers/etiquetas.server.controller');

	app.route('/etiquetas').post(tag.read);
	app.route('/etiquetas/save').post(tag.create);
};