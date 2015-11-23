'use strict';

module.exports = function(app) {
	var privilegios = require('../../app/controllers/privilegios.server.controller');

	app.route('/privilegios/save').post(privilegios.create);
};