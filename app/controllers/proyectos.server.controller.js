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
	Proyecto.find()
	.populate('usuario')
	.exec(function(err, proyectos){
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
	}).populate('usuario')
	.exec(function(err, proyect) {
		if (err) return next(err);
		if (!proyect) return next(new Error('Failed to load proyect ' + id));
		req.profile = proyect;
		next();
	});
};

exports.proyectByUserID = function(req, res, next, id) {
	Proyecto.find({
		usuario: id
	}).exec(function(err, proyect) {
		if (err) return next(err);
		if (!proyect) return next(new Error('Failed to load proyecto with user ' + id));
		req.profile = proyect;
		next();
	});
};


/**
 * Update a Proyecto
 */
exports.update = function(req, res) {
	Proyecto.findOne({
		_id: req.params.proyectId
	}).exec(function(err, proyect) {
		if (err) { return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			}); }
		proyect.nombre = req.body.nombre;
		proyect.descripcion = req.body.descripcion;
		proyect.publico = req.body.publico;
		proyect.save(function(error){
            if(error){res.send(error);
            }
            res.json(proyect);
        });
	});
};

/**
 * Delete an Proyecto
 */
exports.delete = function(req, res) {
	Proyecto.findOne({
		_id: req.params.proyectId
	}).exec(function(err, proyect) {
		if (err) { return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			}); }
		proyect.remove(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(proyect);
			}
		});
	});
};

