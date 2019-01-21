import mongoose from 'mongoose'
import { Order } from '../models'
import { UserInputError } from 'apollo-server-express'

export default {
  Query: {
    orders: (root, arg, context, info) => {
      return Order.find({})
    },
    order: (root, { id }, context, info) => { 
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }

      return Order.findById(id)
    }
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
