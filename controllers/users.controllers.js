const User = require('../models/users.model');

module.exports = () => {
	return {
		list: async(req, res, next) => {
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
		getItem: async(req, res, next) => {
			let userId = req.params.id;
			console.log('userId >>', userId);
			User.findOne({ '_id':userId })
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
		delete: async(req, res) => {
			req.body.isBlocked = true
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
		}
	}
}