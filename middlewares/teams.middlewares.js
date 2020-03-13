const Team = require('../models/teams.model');
let mongoose = require('mongoose'),
	ObjectId = mongoose.Types.ObjectId;

module.exports = () => {
	return {
		validateTeamId: async (req, res, next) => {
			console.log('validateTeamId');
			let teamId = req.params.teamId ? req.params.teamId : req.body.teamId ? req.body.teamId : '';
			if (!teamId) {
				res.json({
					error: 'Invalid Team Id',
					code: 400
				});
			} else {
				Team.findOne({ _id: { $eq: ObjectId(req.params.teamId) } }, (err, data) => {
					if (err) {
						res.json({
							error: err,
							code: 404
						});
					}
					next();
				});
			}
		}
	};
};
