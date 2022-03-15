import { buildSchema } from "graphql";




export const rootSchema =    buildSchema(`
    scalar Date
    type User {
        id: ID!
        email: String!
        password: String
        name: String!
        address: String!
        age: Int!
        phoneNumber: String!
        picture: String
        carrito: [Productos] 

    }
    type Productos {
        id: ID!
        name: String!
        description: String!
        code: String!
        image: String!
        price: String!
        stock: Int!
        timestamp: Date!
    }

    type Query {
        getUser(id: ID!): User
        getProductos: [Productos]
        getProducto(id: ID!): Productos        
    }
    type Mutation {
        createUser(email: String!, password: String!, name: String!, address: String!, age: Int!, phoneNumber: String!, picture: String!): User
        createProducto(name: String!, description: String!, code: String!, image: String!, price: String!, stock: Int!): Productos
        updateUserPassword(id: ID!, password: String!): User
    }
`);


