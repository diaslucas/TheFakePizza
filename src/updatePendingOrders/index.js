import Order from '../models/order'

export default () => {

  const waitTime = 1000 * 60 * 15;
  
  setInterval(UpdatePendingOrdersStatus, waitTime);

  function UpdatePendingOrdersStatus() {
    Order.find({status: "Pending"}, function(err, orders) {
      if(err) {
        console.log(err);
      } else {
        orders.forEach((order) => {
          let now = new Date();
          now = now - (1000 * 60 * 20);
          let createdAt = order.createdAt.getTime();
          if(createdAt <= now) {
            Order.findOneAndUpdate({_id: order._id}, { $set: {status: 'Picked Up' }}, (err, doc) => {
              if(err) {
                console.log(err);
              } else {
                console.log("Order Updated!");
              }
            });
          }
        })
      }
    });
  }

}