const express = require('express')
const graphqlHTTP = require('express-graphql')
const bodyParser = require('body-parser');
const router = require('./router/index');
const schema = require('./schema/users.schema.js');
const connection = require('./util/db');

const app = express()

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.use(function cors(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
});

app.use('/graphql', graphqlHTTP({
	schema: schema,
  	graphiql: true
}));

router(app);

app.listen(3000, () => {
  console.log('App listening on port 3000')
})