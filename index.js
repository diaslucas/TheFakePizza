import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import typeDefs from './src/typeDefs'
import resolvers from './src/resolvers'
import twitterBot from './src/twitterBot'
import updatePendingOrders from './src/updatePendingOrders'
import { DB, APP_PORT, IN_PROD } from './src/configProd'

const app = express()

mongoose.connect(
  DB,
  { useNewUrlParser: true }
)

// Initializing Bot
twitterBot()

updatePendingOrders()

app.disable('x-powered-by')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: !IN_PROD
})

server.applyMiddleware({app})

const port = APP_PORT

app.listen({ port }, () =>
  console.log(`http://localhost:${port}${server.graphqlPath}`)
)
