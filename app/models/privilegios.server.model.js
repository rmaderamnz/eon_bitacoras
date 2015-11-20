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
	nombre:{
		type: String,
		required: 'Es necesario especificar un nombre de privilegio'
	},
	tipo:{
		type: String,
		required: 'Es necesario especificar un tipo (Lectura o escritura)'
	},
	descripcion:{
		type: String,
		default: ''
	},
	usuario:{
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Privilegios', PrivilegiosSchema);

/*
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