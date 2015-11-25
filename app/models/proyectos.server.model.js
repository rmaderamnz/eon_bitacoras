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
	descripcion:{
		type: String
	},
	publico:{
		type: Boolean,
		default: true
	},
	creacion: {
		type: Date,
		default: Date.now
	},
	usuario:{
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Proyectos', ProyectosSchema);