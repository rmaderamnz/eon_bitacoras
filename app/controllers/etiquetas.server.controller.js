'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Etiqueta = mongoose.model('Etiquetas'),
    _ = require('lodash');

/**
 * Create a Etiqueta
 */
exports.create = function(req, res) {
	var consulta = new Etiqueta(req.body);
	consulta.usuario = req.user;
	consulta.save( function(err) {
		if(err){
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}else{
			res.jsonp(consulta);
		}
	});
};

/**
 * Show the current Etiqueta
 */
exports.read = function(req, res) {

};

/**
 * Update a Etiqueta
 */
exports.update = function(req, res) {

};

/**
 * Delete an Etiqueta
 */
exports.delete = function(req, res) {

};

/**
 * List of Etiquetas
 */
exports.list = function(req, res) {

};