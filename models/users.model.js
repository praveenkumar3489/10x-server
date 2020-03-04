'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    shortId = require('shortid'),
    MongoClient = require('mongodb').MongoClient;

var UsersSchema = new Schema({
    email: {
        type: String
    },
    dateOfBirth: {
        type:Date
    },
    gender: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    password:{
        type:String
    },
    hashed_password: {
        type: String
    },
    salt: String,
    profilePic: {
        type: String
    },
    phone: {
        type: String
    },
    isBlocked: {
        type: Boolean
    },
    isActive: {
        type: Boolean,
        'default': false
    },
    createdTime: {
        type: Date
    },
    updatedTime: {
        type: Date
    },
    verificationCode: {
        type: String,
        unique: true,
        'default': shortId.generate
    }
});



module.exports = mongoose.model('User', UsersSchema);

