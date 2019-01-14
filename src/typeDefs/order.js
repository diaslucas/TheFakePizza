import { gql } from 'apollo-server-express'

export default gql`
extend type Query {
  order(id: ID!): Order
  orders: [Order!]!
}

type PizzaOrder {
  flavor: String!
  price: Float!
  quantity: Int!
}

input PizzaInput {
  flavor: String!
  price: Float!
  quantity: Int!
}

type Order {
  id: ID!
  pizzas: [PizzaOrder!]!
  address: String!
  customer: String!
  total: Float!
  status: String!
}

extend type Mutation {
  addOrder(pizzas: [PizzaInput!]!, address: String!, customer: String!, status: String!): Order
}

`
