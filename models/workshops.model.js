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
        type: String,
        trim: true
    },
    action: {
        type: ObjectId,
        ref: 'Actions'
    },
    subCategory: [{
    	text: String,
        ideas: [{
            text: { type: String},
            userId: {
                type: ObjectId,
                ref: 'User'
            },
            comments: [{
                text: { type: String},
                userId: {
                    type: ObjectId,
                    ref: 'User'
                }
            }],
        }],
    }],
    maxActionPerUser: {
    	type: Number
    },
    team: {
    	type: ObjectId,
        ref: 'Team'
    },
    facilitators: [{
        type: ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('Workshop', WorkshopSchema);