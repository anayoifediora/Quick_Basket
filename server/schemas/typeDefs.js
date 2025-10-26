const { ApolloServer } = require("@apollo/server");

const typeDefs = `
    input AddressInput {
        street: String!
        suburb: String!
        state: String!
        postCode: String!
    }
    input ProductInput {
        productId: ID!
        productName: String!,
        price: Float,
        quantity: Int,
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
        role: String,
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
        productName: String,
        description: String,
        price: Float,
        category: String,
        brand: String,
        stock: Int,
        images: [String],
        averageRating: Float,
        reviews: [Review],
    }
    
    type Category {
        _id: ID,
        categoryName: String,
        description: String,
        products: [Product],
        createdAt: String,
        updatedAt: String,
    }
    
    type Order {
        _id: ID,
        userId: ID,
        products: [Product]!,
        totalPrice: Float!,
        deliveryAddress: Address!,
        createdAt: String,
    }
    
    type Review {
        _id: ID,
        reviewText: String,
        reviewAuthor: String,
        rating: Int,
        createdAt: String,
    }

    type Query {
        me: User  
        user(username: String!): User
        users: [User]
        products: [Product]
        product(productId: ID!): Product
        categories: [Category],
        orders: [Order]!,
        reviews: [Review]
        order(orderId: ID!): Order

    }

    type Mutation {
        addUser(username: String!, 
                email: String!, 
                password: String!,
                firstName: String!,
                lastName: String!,
                phone: String!,
                address: AddressInput!
        ) 
        : Auth

        login(email: String!, password: String!): Auth

        updateUser(
            userId: ID!, 
            email: String!, 
            firstName: String!, 
            lastName: String!, 
            phone: String!, 
            address: AddressInput!
        ) : User
         
        removeUser(userId: ID!): User

        addProduct(
            categoryId: ID!,
            productName: String!, 
            description: String!,
            price: Float!,
            category: String!,
            brand: String!, 
            stock: Int!, 
            images: [String]!,
        ) : Product

        updateProduct(
            productId: ID!, 
            productName: String!,
            description: String!,
            price: Float!,
            category: String!,
            brand: String!,
            stock: Int!,
            images: [String]!
        ) : Product

        removeProduct(productId: ID!) : Product
        addCategory(categoryName: String!, description: String!) : Category
        updateCategory(categoryId: ID!, categoryName: String!, description: String!) : Category
        removeCategory(categoryId: ID!): Category
        createOrder(userId: ID!, products: [ProductInput]!, totalPrice: Float!, deliveryAddress: AddressInput!): Order
        addReview(productId: ID!, reviewText: String!, reviewAuthor: String!, rating: Int!): Product
        removeReview(productId: ID!, reviewId: ID!): Product
        updatePassword(email: String!, oldPassword: String!, newPassword: String!): User

    }
`;

module.exports = typeDefs;
