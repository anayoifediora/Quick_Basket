const { ApolloServer } = require('@apollo/server');
const { GraphQLError } = require('graphql');

const { User, Product } = require('../models');

const resolvers = {
    Query: {
        //Lists all users
        users: async () => {
            return await User.find();
        },
        //List all products
        products: async () => {
            return await Product.find();
        }
    }
}

module.exports = resolvers;