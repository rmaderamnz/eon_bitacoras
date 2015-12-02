'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findOne({
		_id: id
	},{ username : 1, firstName : 1, lastName : 1, email: 1 }).exec(function(err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + id));
		req.profile = user;
		next();
	});
};

exports.read = function(req, res) {
	res.jsonp(req.profile);
};

exports.getUsersInfo = function(req, res) {
	User.find({},{ username : 1, firstName : 1, lastName : 1, email: 1 } ).exec(function(err, usuarios){
		if (err) {
			return res.status(400).send({
				message: 'Ocurrio un error'//errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(usuarios);
		}
	});
};


exports.getUserByID = function(req, res) {
	var id = req.body.id;
	User.findOne({
		_id: id
	}).exec(function(err, user) {
		if(err){
			return res.status(400).send({
				message: 'Ocurrio un error'//errorHandler.getErrorMessage(err)
			});
		}else{
			res.jsonp(user);
		}

	});
};



/**
 * Require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}

	next();
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
	var _this = this;

	return function(req, res, next) {
		_this.requiresLogin(req, res, function() {
			if (_.intersection(req.user.roles, roles).length) {
				return next();
			} else {
				return res.status(403).send({
					message: 'User is not authorized'
				});
			}
		});
	};
};