'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Proyecto = mongoose.model('Proyectos'),
    _ = require('lodash');

/**
 * Create a Proyecto
 */
exports.create = function(req, res) {
	var consulta = new Proyecto(req.body);
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

exports.read = function(req, res) {
	res.jsonp(req.profile);
};

/**
 * Show the current Proyecto
 */
exports.getList = function(req, res) {
	Proyecto.find().exec(function(err, proyectos){
		if (err) {
			return res.status(400).send({
				message: 'Ocurrio un error'//errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(proyectos);
		}
	});
};

exports.proyectByID = function(req, res, next, id) {
	Proyecto.findOne({
		_id: id
	}).exec(function(err, proyect) {
		if (err) return next(err);
		if (!proyect) return next(new Error('Failed to load User ' + id));
		req.profile = proyect;
		next();
	});
};

/**
 * Update a Proyecto
 */
exports.update = function(req, res) {

};

/**
 * Delete an Proyecto
 */
exports.delete = function(req, res) {

};

/**
 * List of Proyectos
 */
exports.list = function(req, res) {

};