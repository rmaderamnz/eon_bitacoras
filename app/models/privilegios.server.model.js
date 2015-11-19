'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Privilegios Schema
 */
var PrivilegiosSchema = new Schema({
	nombre:{
		type: String,
		required: 'Es necesario especificar un nombre de privilegio'
	},
	tipo:{
		type: String,
		required: 'Es necesario especificar un tipo (Lectura o escritura)'
	},
	descripcion:{
		type: String,
		default: ''
	},
	usuario:{
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Privilegios', PrivilegiosSchema);