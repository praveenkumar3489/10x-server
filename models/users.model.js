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
        type: String,
        required: true,
        unique: true
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



/**
 * Virtuals
 */
UsersSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function() {
    return this._password;
});

/**
 * Validations
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};

// The below 5 validations only apply if you are signing up traditionally
UsersSchema.path('email').validate(function(email) {
    if (this.provider !== 'local') return true;
    else return email.length;
}, 'Email cannot be blank');
UsersSchema.path('hashed_password').validate(function(hashed_password) {
    if (this.provider !== 'local') return true;
    else return hashed_password.length;
}, 'Password cannot be blank');

/**
 * Pre-save hook
 */
UsersSchema.pre('save', function(next) {

    if (!this.isNew) return next();

    if (!validatePresenceOf(this.password)) next(new Error('Invalid password'));
    else next();
});

/**
 * Methods
 */
UsersSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */
    encryptPassword: function(password) {
        if (!password) return '';
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    }
};



var Users = mongoose.model('User', UsersSchema);

