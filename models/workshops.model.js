'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    crypto = require('crypto'),
    shortId = require('shortid'),
    MongoClient = require('mongodb').MongoClient;

var WorkshopSchema = new Schema({
	name: {
        type: String
    },
    action: {
        type: ObjectId,
        ref: 'Actions'
    },
    subCategory: {
    	type: String
    },
    maxActionPerUser: {
    	type: Number
    },
    comments: [
    	{
    		text: { type: String},
    		userId: {
    			type: ObjectId,
        		ref: 'User'}
    	}
    ]
    // team: {
    // 	type: ObjectId,
    //     ref: 'User'
    // }
})

module.exports = mongoose.model('Workshop', WorkshopSchema);