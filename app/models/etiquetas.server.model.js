'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var EtiquetasSchema = new Schema({
	nombre:{
		type: String,
		required: 'Especifique un nombre a la etiqueta'
	},
	contenido:{
		type: String,
		required: 'Defina el contenido de la etiqueta'
	},
	color:{
		type: String,
		required: 'Especifique un color de etiqueta'
	},
	usuario:{
		type: Schema.ObjectId,
		ref: 'User'
	},
	estado:{ 
		type: Boolean,
		default: true
	},
	creacion: {
		type: Date,
		default: Date.now
	},
	finalizacion: {
		type: Date
	},
	proyecto:{
		type: Schema.ObjectId,
		ref: 'Proyectos'
	}
});

mongoose.model('Etiquetas', EtiquetasSchema);