const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    role: String
    orders: [Order]
    favorites: [MenuItem]
}

type MenuItem {
    _id: ID
    name: String
    description: String
    image: String
    price: Int
    course: Course
}

type Course {
    _id: ID
    name: String
}

type Owner {
    _id: ID
    email: String
}

type Order {
    _id: ID
    purchaseDate: String
    menuItems: [MenuItem]
}

type Checkout {
    session: ID
}

type Auth {
    token: ID
    user: User
}

type Query {
    course: [Course]
    menuItem(_id: ID!): MenuItem
    menuItems: [MenuItem]
    allUsers: [User]
    user: User
    order(_id: ID!): Order
    checkout(menuItems: [ID]!): Checkout
}

type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(_id: ID!, firstName: String, lastName: String, email: String, password: String): User
    updateMenuItem(_id: ID!, name: String, description: String, price: Int): MenuItem
    login(email: String!, password: String!): Auth
    addOrder(menuItems: [ID]!): Order
}
`;

module.exports = typeDefs;