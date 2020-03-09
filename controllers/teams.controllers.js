const Team = require('../models/teams.model');
// const mongoose = require('mongoose');
// const User = mongoose.model('User');

const config = require('../config');
// test

module.exports = () => {
	return {
		membersList: async (req, res) => {
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
		update: async (req, res) => {
			Team.findOneAndUpdate(
				{
					_id: { $eq: req.body.teamId }
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
		}
	};
};
