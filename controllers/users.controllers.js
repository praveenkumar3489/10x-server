const User = require('../models/users.model');
// const mongoose = require('mongoose');
// const User = mongoose.model('User');


const config = require('../config');
// test

module.exports = () => {
    return {
        list: async(req, res) => {
        	return await User.find();
        },
        getItem: async(req, res) => {
        	let userId = req.query.id;
        	console.log('userId >>', userId);
        	return await User.findOne({ '_id':userId })
        },
        create: async(req, res) => {
        	let firstname = req.params.firstname,
        	lastname = req.params.lastname,
        	gender = req.params.gender,
        	console.log('userData >>', userData);
        	return new User(userData).save()
        },
        update: async(req, res) => {
        }
    }
}