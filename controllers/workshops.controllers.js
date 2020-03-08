const Workshop = require('../models/workshops.model');

module.exports = () => {
	return {
		list: async(req, res, next) => {
			let category = req.params.cid,
			subCategory = req.params.scid.split(',');
			console.log("category: ",category);
			console.log("subCategory: ",subCategory);
			Workshop.find({'name':category, 'subCategory': {'$in': subCategory} })
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
			let workshopId = req.params.wid;
			Workshop.findOne({ '_id':workshopId })
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
			let newWorkshop = new Workshop(req.body)
			newWorkshop.save(function(err,data){
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