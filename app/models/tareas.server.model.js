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
	tipo: {
		type: String,
		enum: ['Planificada', 'Mejora', 'Correccion']
	},
	publico:{
		type: Boolean,
		default: true
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
		enum: ['En Espera', 'En Proceso', 'En Pausa', 'Terminada', 'Cancelada'],
		default: 'En Espera'
	},
	usuarios:{
		usuario:[{
			type: Schema.ObjectId,
			ref: 'User'
		}]
	},
	proyectos:{
		proyecto:[{
			type: Schema.ObjectId,
			ref: 'Proyectos'
		}]
	}

});

mongoose.model('Tareas', TareasSchema);