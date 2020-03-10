const Workshop = require('../models/workshops.model');

module.exports = () => {
	return {
		list: async(req, res, next) => {
			let category = req.params.cid,
			subCategory = req.params.scid.split(',');
			Workshop.find({'_id':category, 'subCategory': {'$in': subCategory} })
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
			.populate('subCategory.ideas.userId')
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
		getMeta: async(req, res, next) => {
			let workshopId = req.params.wid;
			Workshop.findOne({ '_id':workshopId })
			.populate('subCategory.ideas.userId')
			.populate('team')
			.populate('team.members.$')
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
				console.log("err:", JSON.stringify(err));
				if(err) return next({
				  error: err,
				  code: 400
				})
				res.json({
					'response': data,
					'code': 201
				})
			})
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
						'response': "Updated Successfully",
						'code': 200
					});
				}
			);
		}
	}
}