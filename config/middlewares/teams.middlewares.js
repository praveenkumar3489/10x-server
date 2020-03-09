const Team = require('../models/teams.model');

module.exports = () => {
	return {
		validateTeamId: async (req, res, next) => {
			console.log('validateTeamId');
			Team.findOne({ _id: { $eq: req.params.teamId } }, (err, data) => {
				if (err) {
					return res.json({
						error: err,
						code: 404
					});
				}
				next();
			});
		}
	};
};
