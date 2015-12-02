'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Tarea = mongoose.model('Tareas'),
    _ = require('lodash');

/**
 * Create a Tarea
 */
exports.create = function(req, res) {
	var consulta = new Tarea(req.body);
	consulta.usuario_creacion = req.user;
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

exports.getByProyect = function(req, res, next, proyectId) {
	Tarea.find({
		'proyectos.id' : proyectId} 
		).exec(function(err, task) {
		if (err) return next(err);
		if (!task) return next(new Error('Failed to load task ' + proyectId));
		req.profile = task;
		next();
	});
};


exports.getByStatus = function(req, res, next, estado) {
	Tarea.find({
		status : estado
	}).exec(function(err, task) {
		if (err) return next(err);
		if (!task) return next(new Error('Failed to load task ' + estado));
		req.profile = task;
		next();
	});
};

exports.getByUser = function(req, res, next, UserId) {
	Tarea.find({
		usuario_creacion : UserId,
		status : { $nin : ['Terminada','Cancelada']}}
		).exec(function(err, task) {
		if (err) return next(err);
		if (!task) return next(new Error('Failed to load task ' + UserId));
		req.profile = task;
		next();
	});
};

exports.getByAsignedUser = function(req, res, next, AsignedUserId) {
	Tarea.find({
		'usuarios_asignados.id' : AsignedUserId,
		status : { $nin : ['Terminada','Cancelada']}}
		).exec(function(err, task) {
		if (err) return next(err);
		if (!task) return next(new Error('Failed to load task ' + AsignedUserId));
		req.profile = task;
		next();
	});
};


exports.getList = function(req, res) {
	Tarea.find().exec(function(err, tasks){
		if (err) {
			return res.status(400).send({
				message: 'Ocurrio un error'//errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tasks);
		}
	});
};

exports.getByTaskId = function(req, res, next, id) {
	Tarea.findOne({
		_id: id
	}).exec(function(err, task) {
		if (err) return next(err);
		if (!task) return next(new Error('Failed to load task ' + task));
		req.profile = task;
		next();
	});
};

exports.read = function(req, res) {
	res.jsonp(req.profile);
};


exports.update = function(req, res) {
	Tarea.findOne({
		_id: req.params.taskId
	}).exec(function(err, task) {
		if (err) { return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			}); }
		task.nombre = req.body.nombre;
		task.descripcion = req.body.descripcion;
		task.proyectos = req.body.proyectos;
		task.usuarios_asignados = req.body.usuarios_asignados;
		task.status = req.body.status;
		task.tipo = req.body.tipo;
		task.publico = req.body.publico;
		task.compromiso = req.body.compromiso;
		task.terminado = req.body.terminado;
		task.save(function(error){
            if(error){res.send(error);
            }
            res.json(task);
        });
	});
};

/**
 * Delete an Tarea
 */
exports.delete = function(req, res) {

};