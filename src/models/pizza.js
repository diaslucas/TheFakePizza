import mongoose from 'mongoose'

const pizzaSchema = new mongoose.Schema({
  flavor: {
    type: String,
    validate: {
      validator: flavor => Pizza.doesntExist({ flavor }),
      message: ({ value }) => `The flavor ${value} already exists.` // TODO Security
    }
  },
  price: {
    type: Number
  },
  isAvailable: Boolean
}, {
  timestamps: true
})

pizzaSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

const Pizza = mongoose.model('Pizza', pizzaSchema, 'pizza')

export default Pizza
