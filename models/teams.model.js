'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	MongoClient = require('mongodb').MongoClient;

var TeamsSchema = new Schema({
	name: {
		type: String,
		trim: true
	},
	access: {
		type: String,
		enum: ['Public', 'Private']
	},
	members: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	status: {
		type: Boolean,
		enum: [0, 1],
		default: 0
	}
});

module.exports = mongoose.model('Team', TeamsSchema);
