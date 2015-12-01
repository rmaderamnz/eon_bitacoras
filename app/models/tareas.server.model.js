'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tareas Schema
 */
var TareasSchema = new Schema({
	nombre:{
		type: String
	},
	descripcion:{
		type: String
	},
	usuario_creacion:{
		type: Schema.ObjectId,
		ref: 'User'
	},
	tipo: {
		type: String,
		enum: ['Planificada', 'Mejora', 'Correccion']
	},
	publico:{
		type: Boolean,
		default: false
	},
	creacion: {
		type: Date,
		default: Date.now
	},
	terminado: {
		type: Date
	},
	compromiso: {
		type: Date
	},
	status: {
		type: String,
		enum: ['Espera', 'Proceso', 'Pausa', 'Terminada', 'Cancelada'],
		default: 'Espera'
	},
	usuarios_asignados:{ },
	proyectos:{ }

});

mongoose.model('Tareas', TareasSchema);