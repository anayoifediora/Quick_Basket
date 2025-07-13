const { ApolloServer } = require('@apollo/server');

const typeDefs = `
    input AddressInput {
        street: String!
        suburb: String!
        state: String!
        postCode: String!
    }
    type Address {
        street: String!
        suburb: String!
        state: String!
        postCode: String!
    }
    type User {
        _id: ID,
        username: String,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        phone: String,
        address: Address,
        reviews: [Review],
        orders: [Order],
        createdAt: String,
        updatedAt: String

    }
    type Product {
        _id: ID,
        name: String,
        description: String,
        price: Float,
        category: String,
        brand: String,
        stock: Int,
        images: [String],
        rating: Number,
        reviews: [Review],
    }
    
    type Query {
        users: [User]
        products: [Product]
    }
`

module.exports = typeDefs;