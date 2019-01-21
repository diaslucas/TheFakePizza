import mongoose from 'mongoose'
import { Pizza } from '../models'
import { UserInputError } from 'apollo-server-express'

export default {
  Query: {
    pizzas: (root, arg, context, info) => {
      if (arg.orderBy != undefined) {
        const splitOrderBy = arg.orderBy.split('_');
        const field = splitOrderBy[0];
        const direction = splitOrderBy[1];
        return Pizza.find({}).sort([[field, direction]])
      }
      return Pizza.find({})
    },
    pizza: (root, { id }, context, info) => { // id is coming from args param
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID.`)
      }

      return Pizza.findById(id)
    }
  },
  Mutation: {
    addPizza: (root, args, context, info) => {
      return Pizza.create(args)
    }
  }
}
