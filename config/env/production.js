'use strict';

module.exports = {
    mongodb: {
		database_uri:
			process.env.DATABASE_URI ||
			'mongodb://localhost:27017/tweetdb'
	},
}