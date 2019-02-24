import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import typeDefs from './src/typeDefs'
import resolvers from './src/resolvers'
import twitterBot from './src/twitterBot'
import updatePendingOrders from './src/updatePendingOrders'
import { DB, APP_PORT, IN_PROD } from './src/config'

const app = express()

// Initializing Bot
mongoose.connect(
  process.env.DB || DB,
  { useNewUrlParser: true }
)

twitterBot()

updatePendingOrders()

app.disable('x-powered-by')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: (process.env.environment === "production") || !IN_PROD
})

server.applyMiddleware({app})

app.listen({ port: process.env.PORT || APP_PORT }, () =>
  console.log(`http://localhost:${APP_PORT}${server.graphqlPath}`)
)
