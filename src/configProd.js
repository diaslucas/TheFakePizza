import { DB, APP_PORT, TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET, URL } from './src/config'

export const {
  APP_PORT = process.env.port || APP_PORT,
  NODE_ENV = process.env.NODE_ENV,
  DB = process.env.DB || DB,
  TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY || TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET || TWITTER_CONSUMER_SECRET,
  TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN || TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET || TWITTER_ACCESS_TOKEN_SECRET,
  URL = process.env.URL || URL

} = process.env

export const IN_PROD = NODE_ENV === 'production'
