import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import typeDefs from './src/typeDefs'
import resolvers from './src/resolvers'
import Twit from 'twit'
import { DB, APP_PORT, IN_PROD, TWITTER_CONSUMER_KEY, 
  TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET } from './src/config'

const app = express()

// Setting up Twitter API
var T = new Twit({
  consumer_key:         TWITTER_CONSUMER_KEY,
  consumer_secret:      TWITTER_CONSUMER_SECRET,
  access_token:         TWITTER_ACCESS_TOKEN,
  access_token_secret:  TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

// Setting up a user stream
var stream = T.stream('statuses/filter', { track: ['@thefakepizza'] })
 
// Anytime someone tweets me
stream.on('tweet', function (tweet) {
  const replyTo = tweet.user.screen_name;
  const text = tweet.text.replace('@thefakepizza', '');
  const from = tweet.user.name;
  const tweetID = tweet.id_str;

  var newTweet = '@' + replyTo + ' Success!';
  tweetIt(newTweet, tweetID);

})

// Replies the tweet
function tweetIt(txt, tweetID){
  var tweet = { status: txt, in_reply_to_status_id: tweetID };
  T.post('statuses/update', tweet, tweeted);

  function tweeted(err, data, response) {
    if (err){
      console.log('Something went wrong!');
    } else {
      console.log('It worked!');
    }
  }
}

mongoose.connect(
  DB,
  { useNewUrlParser: true }
)

app.disable('x-powered-by')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: !IN_PROD
})

server.applyMiddleware({app})

app.listen({ port: APP_PORT }, () =>
  console.log(`http://localhost:${APP_PORT}${server.graphqlPath}`)
)
