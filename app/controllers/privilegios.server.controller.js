'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Privilegio = mongoose.model('Privilegios'),
    _ = require('lodash');

/**
 * Create a Privilegio
 */
exports.create = function(req, res) {
	var consulta = new Privilegio(req.body);
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
 * Show the current Privilegio
 */
exports.read = function(req, res) {
	res.jsonp(req.profile);
};

/**
 * Update a Privilegio
 */
exports.update = function(req, res) {

};

/**
 * Delete an Privilegio
 */
exports.delete = function(req, res) {

	Privilegio.findOne({
		_id: req.params.PrivId
	}).exec(function(err, priv) {
		if (err) { return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			}); }
		priv.remove(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(priv);
			}
		});
	});
};

/**
 * List of Privilegios
 */
exports.list = function(req, res) {

};


exports.getPrivById = function(req, res, next, id) {
	Privilegio.findOne({
		_id: id
	}).exec(function(err, priv) {
		if (err) return next(err);
		if (!priv) return next(new Error('Failed to load privilege with user ' + id));
		req.profile = priv;
		next();
	});
};

exports.getUserPrivilege = function(req, res, next, id) {
	Privilegio.find({
		usuario: id
	}).exec(function(err, priv) {
		if (err) return next(err);
		if (!priv) return next(new Error('Failed to load privilege with user ' + id));
		req.profile = priv;
		next();
	});
};