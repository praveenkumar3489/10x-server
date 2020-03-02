'use strict';

module.exports = {
    mongodb: {
		database_uri:
			process.env.DATABASE_URI ||
			"mongodb+srv://praveen:Rosebud123@cluster0-pbdk9.mongodb.net/test?retryWrites=true&w=majority"
	},
}