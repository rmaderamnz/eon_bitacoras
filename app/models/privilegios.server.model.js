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
	modulo:{
		id : {
			type: Schema.ObjectId,
			ref: 'Modulo'
		},
		nombre: {
			type: String
		}
	},
	privilegios:{ },
	usuario:{
		type: Schema.ObjectId,
		ref: 'User'
	}	
});

mongoose.model('Privilegios', PrivilegiosSchema);