import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import typeDefs from './src/typeDefs'
import resolvers from './src/resolvers'
import twitterBot from './src/twitterBot'
import updatePendingOrders from './src/updatePendingOrders'
// import { DB, PORT, IN_PROD } from './src/config'


const app = express()

mongoose.connect(
  process.env.DB || DB,
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

const port = process.env.PORT || PORT

app.listen({ port }, () =>
  console.log(`http://localhost:${port}${server.graphqlPath}`)
)
