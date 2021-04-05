const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
    favorites: [Food]
}

type MenuItem {
    _id: ID
    name: String
    description: String
    price: Int
    course: Category
}

type Restaurant {
    _id: ID
    name: String
    description: String
    food: [Food]
}

type Owner {
    _id: ID
    email: String
}

type Checkout {
    session: ID
}

type Auth {
    token: ID
    user: User
}

type Query {
    menuItem(_id: ID!): MenuItem
    menuItems: [MenuItem]
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
}

type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateMenuItem(_id: ID!): MenuItem
    login(email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
}
`;

module.exports = typeDefs;