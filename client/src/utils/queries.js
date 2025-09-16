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
