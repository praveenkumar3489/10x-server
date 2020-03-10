const Team = require('../models/teams.model');
// const mongoose = require('mongoose');
// const User = mongoose.model('User');

const config = require('../config');
// test

module.exports = () => {
	return {
		list: async(req, res, next) => {
			Team.find()
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
		membersList: async (req, res, next) => {
			Team.find({
				_id: { $in: req.params.teamId }
			})
				.populate('members')
				.exec((err, data) => {
					if (err)
						return next({
							error: err,
							code: 400
						});
					res.json({
						response: data
					});
				});
		},
		update: async (req, res, next) => {
			Team.findOneAndUpdate(
				{
					_id: { $eq: req.params.teamId }
				},
				req.body,
				(err, data) => {
					if (err)
						return next({
							error: err,
							code: 400
						});
					res.json({
						response: data
					});
				}
			);
		},
		create: async(req, res, next) => {
			let newTeam = new Team(req.body)
			newTeam.save(function(err,data){
				if(err) return next({
				  error: err,
				  code: 400
				})
				res.json({
					'response': data,
				})
			})
		},
	};
};
