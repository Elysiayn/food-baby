const mongoose = require('mongoose');

const { Schema } = mongoose;

const menuItemSchema = new Schema ({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 1.00
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;