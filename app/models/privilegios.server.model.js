'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Privilegios Schema
 */
var PrivilegiosSchema = new Schema({
	tipo:{
		type: [{
			type: String,
			enum: ['create','read','update','delete']
		}],
		required: 'Es necesario especificar un tipo de privilegio'
	},
	usuario:{
		type: Schema.ObjectId,
		ref: 'User'
	},
	modulo:{
		type: Schema.ObjectId,
		ref: 'Modulo'
	}/*,
	tareas:{
		type: Schema.ObjectId,
		ref: 'User'
	},
	proyectos:{
		type: Schema.ObjectId,
		ref: 'User'
	}*/
	
});

mongoose.model('Privilegios', PrivilegiosSchema);

/*
roles: {
		type: [{
			type: String,
			enum: ['user', 'admin']
		}],
		default: ['user']
	},



//consulta-tareas
USUARIO!;
{
    "_id": ObjectID("564e265577b03191a07d9c10"),
    "salt": ")O\ufffdx[Fl\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\u0011>\ufffd",
    "provider": "local",
    "username": "rmadera",
    "created": ISODate("2015-11-19T19:43:17.573Z"),
    "roles": [
        "user"
    ],
    "password": "mgbNwivilSRcgeb27jTLHOj8R7vAvWXoYw83aJYXrvyZGVRSv+GLKUWiqHZrrOdxsxZoqne9KMFOulsAAPcPxg==",
    "email": "rmadera@eoncore.mx",
    "lastName": "Madera Muñoz",
    "firstName": "Roberto",
    "__v": 0
}

*/