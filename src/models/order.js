import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  pizzas: {
    type: Array
  },
  customerPhotoURL: {
    type: String
  },
  customer: {
    type: String
  },
  total: {
    type: Number
  },
  status: {
    type: String
  }
}, {
  timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order
