const Workshop = require('../models/workshops.model'),
	User = require('../models/users.model');
let mongoose = require('mongoose'),
	ObjectId = mongoose.Types.ObjectId;

module.exports = () => {
	return {
		list: async (req, res, next) => {
			let category = req.params.cid,
				subCategory = req.params.scid.split(',');
			console.log('category:', subCategory);
			let query = { _id: ObjectId(category) };
			if (req.params.scid !== 'all') {
				query['subCategory.text'] = { $in: subCategory };
			}
			Workshop.find(query).exec(function(err, data) {
				console.log('err:', err);
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
		getItem: async (req, res, next) => {
			let workshopId = req.params.wid;
			Workshop.findOne({ _id: workshopId })
				.populate('facilitators')
				.populate('action')
				.populate('subCategory.ideas.userId')
				.exec(function(err, data) {
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
		getMeta: async (req, res, next) => {
			let workshopId = req.params.wid;
			Workshop.findOne({ _id: workshopId })
				.populate('subCategory.ideas.userId')
				.populate('facilitators')
				.populate('team')
				.exec(function(err, data) {
					if (data.team && data.team.members) {
						User.find({ _id: { $in: data.team.members } }).exec(function(error, members) {
							data.team.members = members;
							if (error)
								return next({
									error: error,
									code: 400
								});
							res.json({
								response: data
							});
						});
					} else {
						if (err)
							return next({
								error: err,
								code: 400
							});
						res.json({
							response: data
						});
					}
				});
		},
		create: async (req, res, next) => {
			let newWorkshop = new Workshop(req.body);
			newWorkshop.save(function(err, data) {
				console.log('err:', JSON.stringify(err));
				if (err)
					return next({
						error: err,
						code: 400
					});
				res.json({
					response: data,
					code: 201
				});
			});
		},
		update: async (req, res) => {
			Workshop.findOneAndUpdate(
				{
					_id: { $eq: req.params.wid }
				},
				req.body,
				(err, data) => {
					if (err)
						return next({
							error: err,
							code: 400
						});
					res.json({
						response: 'Updated Successfully',
						code: 200
					});
				}
			);
		},
		setTimer: async (req, res) => {
			let startTime = new Date(req.body.startTime);
			req.body['endTime'] = startTime.getTime() + 1 * 60000;
			Workshop.findOneAndUpdate(
				{
					_id: { $eq: req.params.wid }
				},
				req.body,
				{
					upsert: true
				},
				(err, data) => {
					if (err)
						return next({
							error: err,
							code: 400
						});
					res.json({
						response: 'Data added',
						code: 200
					});
				}
			);
		},
		addMinute: async (req, res) => {
			Workshop.findOne(
				{
					_id: { $eq: req.params.wid }
				},
				(err, data) => {
					if (err)
						return next({
							error: err,
							code: 400
						});

					let startTime = data.startTime ? data.startTime : Date.now();
					let endTime = data.endTime;
					let updatedEndTime = endTime ? endTime.getTime() + 1 * 60000 : startTime.getTime() + 1 * 60000;
					Workshop.findOneAndUpdate(
						{
							_id: { $eq: req.params.wid }
						},
						{
							startTime: startTime,
							endTime: updatedEndTime
						},
						(err, data) => {
							if (err)
								return next({
									error: err,
									code: 400
								});
							res.json({
								response: 'Updated Successfully',
								code: 200
							});
						}
					);
				}
			);
		}
	};
};
