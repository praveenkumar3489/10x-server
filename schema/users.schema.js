const graphql = require('graphql');
const shortId = require('shortid');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = graphql;


const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
	name: 'RootQueryType',
    fields: {
		hello: {
			type: GraphQLString,
			resolve() {
			  return 'world'
			}
		},
		email: {
	        type: GraphQLString,
	        required: true,
	        unique: true
	    },
	    dateOfBirth: {
	        type:Date
	    },
	    gender: {
	        type: GraphQLString
	    },
	    firstName: {
	        type: GraphQLString
	    },
	    lastName: {
	        type: GraphQLString
	    },
	    profilePic: {
	        type: GraphQLString
	    },
	    phone: {
	        type: GraphQLString
	    },
	    createdTime: {
	        type: Date
	    },
	    updatedTime: {
	        type: Date
	    },
	    verificationCode: {
	        type: GraphQLString,
	        unique: true,
	        'default': shortId.generate
	    }
    }
  })
})

module.exports = schema;