'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Privilegio = mongoose.model('Privilegios'),
    _ = require('lodash');

/**
 * Create a Privilegio
 */
exports.create = function(req, res) {
	var valores = req.body;
	res.jsonp(valores);
	/*
	var consulta = new Privilegio();
	consulta.save();
	*/
};

/**
 * Show the current Privilegio
 */
exports.read = function(req, res) {

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

};

/**
 * List of Privilegios
 */
exports.list = function(req, res) {

};