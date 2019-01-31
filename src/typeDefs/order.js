import { gql } from 'apollo-server-express'

export default gql`
extend type Query {
  order(id: ID!): Order
  orders: [Order!]!
  popularChoices: [PopularChoices]
}

type PopularChoices {
  _id: String,
  count: Int
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
  customer: String!
  total: Float!
  status: String!
}

extend type Mutation {
  addOrder(pizzas: [PizzaInput!]!, customer: String!, status: String!): Order
}

`
