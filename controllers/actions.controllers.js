const Action = require('../models/actions.model');

module.exports = () => {
	return {
		create: async(req, res, next) => {
			let newAction = new Action(req.body)
			newAction.save(function(err,data){
				if(err) return next({
				  error: err,
				  code: 400
				})
				res.json({
					'response': data
				})
			})
		}
	}
}