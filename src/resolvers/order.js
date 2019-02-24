import mongoose from 'mongoose'
import { Order } from '../models'
import { UserInputError } from 'apollo-server-express'

export default {
  Query: {
    orders: (root, args, context, info) => {
      if(args.lastOrders === true) {
        return Order.find({}).sort([["createdAt", "DESC"]]).limit(5)
      }
      return Order.find({})
    },
    order: (root, { id }, context, info) => { 
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }

      return Order.findById(id)
    },
    popularChoices: async (root, args, context, info) => {
      const aggregatorOpts = [{
        $unwind: "$pizzas"
      },
      {
        $group: {
          _id: "$pizzas.flavor",
          count: { $sum: "$pizzas.quantity" }
        },
      },
      {
        $sort: {
          count: -1
        }
      }
      ]

      return await Order.aggregate(aggregatorOpts).limit(5).exec().then((pizzas) => pizzas)
    },
  },
  Mutation: {
    addOrder: (root, args, context, info) => {
      var total = 0;
      args.pizzas.forEach((pizza) => {
        total += pizza.price * pizza.quantity;
      })
      args = { ...args, total };
      return Order.create(args)
    }
  }
}
