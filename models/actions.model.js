'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    shortId = require('shortid'),
    MongoClient = require('mongodb').MongoClient;

var ActionSchema = new Schema({
	name: {
        type: String
    },
    isActive: {
        type: Boolean,
        'default': true
    }
})

module.exports = mongoose.model('Actions', ActionSchema);