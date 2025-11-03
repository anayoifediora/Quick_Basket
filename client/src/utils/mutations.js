import { gql } from "@apollo/client";

//Mutation to login a user
export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
//Mutation to create a user
export const ADD_USER = gql`
  mutation Mutation(
    $username: String!
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phone: String!
    $address: AddressInput!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      address: $address
    ) {
      token
      user {
        username
        firstName
        lastName
        email
        phone
        role
        address {
          postCode
          state
          street
          suburb
        }
      }
    }
  }
`;

//Mutation to add a review to a product
export const ADD_REVIEW = gql`
  mutation Mutation(
    $productId: ID!
    $reviewText: String!
    $reviewAuthor: String!
    $rating: Int!
  ) {
    addReview(
      productId: $productId
      reviewText: $reviewText
      reviewAuthor: $reviewAuthor
      rating: $rating
    ) {
      averageRating
      description
      price
      productName
      reviews {
        createdAt
        _id
        rating
        reviewAuthor
        reviewText
      }
    }
  }
`;
//Mutation to create a new order
export const CREATE_ORDER = gql`
  mutation Mutation(
    $userId: ID!
    $products: [ProductInput]!
    $totalPrice: Float!
    $deliveryAddress: AddressInput!
  ) {
    createOrder(
      userId: $userId
      products: $products
      totalPrice: $totalPrice
      deliveryAddress: $deliveryAddress
    ) {
      _id
      createdAt
      products {
        productName
      }
      totalPrice
      userId
    }
  }
`;
