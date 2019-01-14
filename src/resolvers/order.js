import mongoose from 'mongoose'
import { Order } from '../models'
import { UserInputError } from 'apollo-server-express'

export default {
  Query: {
    orders: (root, arg, context, info) => {
      // TODO auth, projection, pagination

      return Order.find({})
    },
    order: (root, { id }, context, info) => { // id is coming from args param
      // TODO auth, projection, sinatization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }

      return Order.findById(id)
    }
  },
  Mutation: {
    addOrder: (root, args, context, info) => {
      // TODO not auth
      var total = 0;
      args.pizzas.forEach((pizza) => {
        total += pizza.price * pizza.quantity;
      })
      args = { ...args, total };
      return Order.create(args)
    }
  }
}
