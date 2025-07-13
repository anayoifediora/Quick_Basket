const { ApolloServer } = require('@apollo/server');
const { GraphQLError } = require('graphql');
const { signToken } = require('../utils/auth');

const { User, Product, Category } = require('../models');

const resolvers = {
    Query: {
        //Lists all users
        users: async () => {
            return await User.find();
        },
        //List all products
        products: async () => {
            return await Product.find();
        },
        //List all categories
        categories: async () => {
            return await Category.find();
        }
    },
    
    Mutation: {
        //Creates a new user
        addUser: async (parent, { username, email, password, firstName, lastName, phone, address }) => {
            const user = await User.create({ username, email, password, firstName, lastName, phone, address});
            const token = signToken(user);

            return { token, user }
        }
    }
}

module.exports = resolvers;