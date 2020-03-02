const mongoose = require('mongoose'),
	config = require('../config');
mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
console.log('config >>>', config.mongodb.database_uri);
const connection = mongoose.connect(config.mongodb.database_uri);

// Connect the db with the url provide
try {
	mongoose.connect(config.mongodb.database_uri);
} catch (err) {
	mongoose.createConnection(config.mongodb.database_uri);
}

mongoose.connection
	.once('open', () => console.log('MongoDB Running'))
	.on('error', e => {
		throw e;
	});

connection
	.then(db => {
		console.log(`successfuly connected to ${config.mongodb.database_uri}`);
		return db;
	})
	.catch(err => {
		if (err.message.code === 'ETIMEDOUT') {
			//logger.info('Attempting to re-establish database connection.');
			mongoose.connect(config.mongodb.database_uri);
		} else {
			//logger.error('Error while attempting to connect to database:');
			//logger.error(err);
		}
	});

//export default connection;
