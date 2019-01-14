import mongoose from 'mongoose'
import { Pizza } from '../models'
import { UserInputError } from 'apollo-server-express'

export default {
  Query: {
    pizzas: (root, arg, context, info) => {
      // TODO auth, projection, pagination

      return Pizza.find({})
    },
    pizza: (root, { id }, context, info) => { // id is coming from args param
      // TODO auth, projection, sinatization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }

      return Pizza.findById(id)
    }
  },
  Mutation: {
    addPizza: (root, args, context, info) => {
      // TODO not auth
      return Pizza.create(args)
    }
  }
}
