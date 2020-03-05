const User = require('../models/users.model');
// const mongoose = require('mongoose');
// const User = mongoose.model('User');


const config = require('../config');
// test

module.exports = () => {
	return {
		list: async(req, res) => {
			User.find()
		    .exec(function(err,data){
		        if(err) return next({
		          error: err,
		          code: 400
		        })
		        res.json({
	                'response': data
	            })
		    })
		},
		getItem: async(req, res) => {
			let userId = req.query.id;
			console.log('userId >>', userId);
			return await User.findOne({ '_id':userId })
		},
		create: async(req, res, next) => {
			let newUser = new User(req.body)
			newUser.save(function(err,data){
				if(err) return next({
				  error: err,
				  code: 400
				})
				res.json({
					'response': data,
				  })
			})
		},
		update: async(req, res) => {
		}
	}
}