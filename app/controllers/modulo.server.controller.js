'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Modulo = mongoose.model('Modulo'),
    _ = require('lodash');

/**
 * Create a Modulo
 */
exports.create = function(req, res) {
	var consulta = new Modulo();
	consulta.save();
};

/**
 * Show the current Modulo
 */
exports.read = function(req, res) {

	Modulo.find().exec(function(err, modulos){
		if (err) {
			return res.status(400).send({
				message: 'Ocurrio un error'//errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(modulos);
		}
	});
};

/**
 * Update a Modulo
 */
exports.update = function(req, res) {

};

/**
 * Delete an Modulo
 */
exports.delete = function(req, res) {

};

/**
 * List of Modulos
 */
exports.list = function(req, res) {

};