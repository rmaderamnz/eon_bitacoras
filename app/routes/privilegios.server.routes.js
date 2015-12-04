'use strict';

module.exports = function(app) {
	var privilegios = require('../../app/controllers/privilegios.server.controller');

	app.route('/privilegios/save').post(privilegios.create);
	app.route('/privilegios/:PrivUserId')
		.post(privilegios.read);

	app.param('PrivUserId', privilegios.getUserPrivilege);
};