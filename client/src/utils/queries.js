import { gql } from "@apollo/client";

//Query to fetch all products
export const QUERY_ALL_PRODUCTS = gql`
  query Query {
    products {
      productName
      price
      images
      averageRating
      _id
    }
  }
`;

//Query to fetch a single product
export const QUERY_SINGLE_PRODUCT = gql`
  query Query($productId: ID!) {
    product(productId: $productId) {
      reviews {
        _id
        createdAt
        rating
        reviewAuthor
        reviewText
      }
      productName
      images
      price
      description
      averageRating
      _id
      stock
      category
    }
  }
`;
