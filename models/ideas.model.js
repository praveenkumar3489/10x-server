'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    MongoClient = require('mongodb').MongoClient;

var IdeaSchema = new Schema({
	text: { type: String},
	userId: {
		type: ObjectId,
		ref: 'User'
    },
    comments: [{
        text: { type: String},
        userId: {
            type: ObjectId,
            ref: 'User'}
    }],
})

module.exports = mongoose.model('Idea', IdeaSchema);