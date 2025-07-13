const { ApolloServer } = require("@apollo/server");

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
    
    type Auth {
        token: ID!
        user: User
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
        rating: Int,
        reviews: [Review],
    }
    
    type Category {
        _id: ID,
        name: String,
        description: String,
        products: [Product],
        createdAt: String,
        updatedAt: String,
    }
    
    type Order {
        _id: ID,
        products: [Product],
        totalPrice: Float,
        deliveryAddress: Address,
        createdAt: String,
    }
    
    type Review {
        _id: ID,
        comment: String,
        commentAuthor: String,
        createdAt: String,
    }

    type Query {
        users: [User]
        products: [Product]
        categories: [Category],
        orders: [Order],
        reviews: [Review]

    }

    type Mutation {
        addUser(username: String!, 
                email: String!, 
                password: String!,
                firstName: String!,
                lastName: String!,
                phone: String!,
                address: AddressInput
        ) : Auth
    }
`;

module.exports = typeDefs;
