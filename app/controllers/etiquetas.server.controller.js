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
  

exports.getByProyect = function(req, res, next, id) {
	Etiqueta.find({
		proyecto: id
	}).exec(function(err, tag) {
		if (err) return next(err);
		if (!tag) return next(new Error('Failed to load Tag ' + id));
		req.profile = tag;
		next();
	});
};

exports.getByTask = function(req, res, next, id) {
	Etiqueta.find({
		tarea: id
	}).exec(function(err, tag) {
		if (err) return next(err);
		if (!tag) return next(new Error('Failed to load Tag ' + id));
		req.profile = tag;
		next();
	});
};

/**
 * Show the current Etiqueta
 */
exports.read = function(req, res) {
	res.jsonp(req.profile);
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
	Etiqueta.findOne({
		_id : req.params.proyectIdtag
	}).exec(function(err, tag) {
		if (err) { return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			}); }
		tag.remove(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(tag);
			}
		});
	});
};

/**
 * List of Etiquetas
 */
exports.list = function(req, res) {

};