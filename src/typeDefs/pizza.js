import { gql } from 'apollo-server-express'

export default gql`
extend type Query {
  pizza(id: ID!): Pizza
  pizzas(orderBy: String): [Pizza!]!
}

extend type Mutation {
  addPizza(flavor: String!, price: Float!, isAvailable: Boolean!): Pizza
}

type Pizza {
  id: ID!
  flavor: String!
  price: Float!
  isAvailable: Boolean!
  createdAt: String!
}

`
