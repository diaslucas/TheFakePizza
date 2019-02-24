import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import typeDefs from './src/typeDefs'
import resolvers from './src/resolvers'
import twitterBot from './src/twitterBot'
import updatePendingOrders from './src/updatePendingOrders'

const IN_PROD = process.env.NODE_ENV === 'production'

const app = express()

mongoose.connect(
  process.env.DB || require('./src/config').DB,
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

if(IN_PROD){
  // Set static folder
  app.use(express.static('client/build'))

  const path = require('path')

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}


const port = process.env.PORT || require('./src/config').PORT

app.listen({ port }, () =>
  console.log(`http://localhost:${port}${server.graphqlPath}`)
)
