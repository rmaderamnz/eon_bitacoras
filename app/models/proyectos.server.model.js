'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Proyectos Schema
 */
var ProyectosSchema = new Schema({
	nombre:{
		type: String
	},
	estado:{
		type: Boolean
	},
	vista:{
		type: String
	},
	publico:{
		type: Boolean,
		default: true
	}
});

mongoose.model('Proyectos', ProyectosSchema);