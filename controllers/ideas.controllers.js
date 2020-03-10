const Idea = require('../models/ideas.model');

module.exports = () => {
	return {
		list: async(req, res, next) => {
			Idea.find()
		    .exec(function(err,data){
		    	console.log("err:", err);
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
			let ideaId = req.params.iid;
			Idea.findOne({ '_id':ideaId })
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
			let newIdea = new Idea(req.body)
			newIdea.save(function(err,data){
				console.log("err:", JSON.stringify(err));
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