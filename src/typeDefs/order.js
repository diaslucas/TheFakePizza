import { gql } from 'apollo-server-express'

export default gql`
extend type Query {
  order(id: ID!): Order
  orders(lastOrders: Boolean): [Order!]!
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
  customerPhotoURL: String!
  total: Float!
  status: String!
  createdAt: String!
}

extend type Mutation {
  addOrder(pizzas: [PizzaInput!]!, customer: String!, customerPhotoURL: String!, status: String!): Order
}

`
