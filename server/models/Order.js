const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  menuItems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'MenuItem'
    }
  ],
  //  reward point system 
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
