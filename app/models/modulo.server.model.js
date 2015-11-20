'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Modulo Schema
 */
var ModuloSchema = new Schema({
	nombre:{
		type: String
	},
	estado:{
		type: Boolean
	},
	vista:{
		type: String
	}
});

mongoose.model('Modulo', ModuloSchema);
