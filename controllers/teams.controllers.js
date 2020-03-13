const Team = require('../models/teams.model');
// const mongoose = require('mongoose');
// const User = mongoose.model('User');

const config = require('../config');
let mongoose = require('mongoose'),
	ObjectId = mongoose.Types.ObjectId;
// test

module.exports = () => {
	return {
		getById: async (req, res) => {
			Team.find({
				_id: { $eq: ObjectId(req.params.teamId) }
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
		list: async (req, res, next) => {
			Team.find().exec(function(err, data) {
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
		getAll: async (req, res) => {
			Team.find()
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
					_id: { $eq: ObjectId(req.params.teamId) }
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
		create: async (req, res, next) => {
			let newTeam = new Team(req.body);
			newTeam.save(function(err, data) {
				if (err)
					return next({
						error: err,
						code: 400
					});
				res.json({
					response: data
				});
			});
		}
	};
};
