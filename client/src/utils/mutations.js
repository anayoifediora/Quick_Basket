import { gql } from '@apollo/client';

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
`
//Mutation to create a user
export const ADD_USER = gql`
    mutation Mutation($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!, $phone: String!, $address: AddressInput!) {
        addUser(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName, phone: $phone, address: $address) {
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
`