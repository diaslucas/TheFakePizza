import Twit from 'twit'
import { TWITTER_CONSUMER_KEY, 
  TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET } from '../config'

export default twitterBot = () => {

  var T = new Twit({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token: TWITTER_ACCESS_TOKEN,
    access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
  })


  // Setting up a user stream
  var stream = T.stream('statuses/filter', { track: ['@thefakepizza'] })

  // Anytime someone tweets me
  stream.on('tweet', function (tweet) {
    const replyTo = tweet.user.screen_name;
    let text = tweet.text.replace('@thefakepizza', '').toLowerCase();
    const currentDate = new Date();
    const isOpen = currentDate.getHours() < 20;

    if (text.indexOf('menu')) {
      if (!isOpen) {
        console.log("Here's our menu but we are closed now");
      }
      console.log("Here's our menu");
      // Send menu link;
    }
    
    text = text.replace("i will have ", "");
    text = text.replace("i'll have ", "");

    let splitTextByTheAddress = text.split(' the address is ');
    let pizzas = splitTextByTheAddress[0];
    let address = splitTextByTheAddress[1].replace(" the address is ", "");

    let pizzasSplit = pizzas.split(',');
    console.log(pizzas);
    console.log(address);

    const from = tweet.user.name;
    const tweetID = tweet.id_str;

    var newTweet = '@' + replyTo + ' Success!';
    // tweetIt(newTweet, tweetID);

  })

  // Replies the tweet
  function tweetIt(txt, tweetID) {
    var tweet = { status: txt, in_reply_to_status_id: tweetID };
    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
      if (err) {
        console.log('Something went wrong!');
      } else {
        console.log('It worked!');
      }
    }
  }

}