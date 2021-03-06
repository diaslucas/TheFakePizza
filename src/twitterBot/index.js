import Twit from 'twit'
import Order from '../models/order'
import Pizza from '../models/pizza'
export default () => {

  var T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY || require('../config').TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET || require('../config').TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN || require('../config').TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || require('../config').TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
  })

  // Setting up a user stream
  var stream = T.stream('statuses/filter', { track: ['@thefakepizza'] })

  // Anytime someone tweets me
  stream.on('tweet', async function (tweet) {
    const replyTo = tweet.user.screen_name;
    const customerName = tweet.user.name;
    const customerPhotoURL = tweet.user.profile_image_url;
    let text = tweet.text.replace('@thefakepizza', '');

    var replyText = '';

    const currentDate = new Date();
    const isOpen = currentDate.getHours() < 20;
    
    var submatchPizzas = '';
    var matchesPizzas = text.match(/\[(.*?)\]/);
    if (isOpen) {
      if (matchesPizzas) {
        submatchPizzas = matchesPizzas[1];
        var splitOrder = submatchPizzas.split(',');
        var errorGettingPizza = false;
        var orderTotal = 0;

        var orderedPizzas = await Promise.all(splitOrder.map(async (orderedPizza) => {
          const flavor = orderedPizza.trim().slice(2, orderedPizza.length);
          const quantity = parseInt(orderedPizza.trim().slice(0, 1));
          const price = await GetPizzaPrice(flavor);
          if (price !== null) {
            orderTotal += price * quantity;
            return {
              quantity: quantity,
              flavor: flavor,
              price: price
            }
          } else {
            errorGettingPizza = true;
          }
        }))

        if (errorGettingPizza) {
          replyText = 'Sorry! There was an error placing your order.';
        } else {
          var newOrder = {
            pizzas: orderedPizzas,
            customer: customerName,
            customerPhotoURL: customerPhotoURL,
            status: 'Pending',
            total: orderTotal
          }
          Order.create(newOrder);
          replyText = 'Thank you! Your order has been placed.';
        }
      } else if(text.toLowerCase().indexOf('menu') > -1) {
        replyText = `Here is our menu ${process.env.URL || require('../config').URL}/menu`;
      } else {
        replyText = `Sorry! This is not a valid command. You can check our command list here ${process.env.URL || require('../config').URL}/commands`
      }

    } else {
      replyText = 'Sorry! We are closed right now.';
    }

    const tweetID = tweet.id_str;

    var newTweet = '@' + replyTo + ' ' + replyText;
    tweetIt(newTweet, tweetID);
  })

  // Replies the tweet
  function tweetIt(txt, tweetID) {
    var tweet = { status: txt, in_reply_to_status_id: tweetID };
    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
      if (err) {
        console.log('Something went wrong!');
      } else {
        console.log('Tweeted!');
      }
    }
  }

  async function GetPizzaPrice(flavor) {
    try {
      const pizza = await Pizza.findOne({ flavor }).select('price');
      return pizza.price;
    } catch (error) {
        return null;
    }

  }

}