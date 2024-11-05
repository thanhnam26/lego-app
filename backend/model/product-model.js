const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    required: true, // Consider making this required if it should always have a value
  },
  feedback: [
    {
      feedback_id: {
        type: Schema.Types.ObjectId,
        ref: "Feedback",
      },
    },
  ],
  discount: {
    type: Number,
    default: 0, // Default to 0 if not provided
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    note: {
      type: String,
    },
  },
  delete_id: {
    type: Number,
    default: 0,
  },
  status: {
    type: Number,
    default: 0,
  },
  productInfo:{
    origin:String,
    ageUse: Number,
    brand_origin: String,
    gender: Boolean
    
  }
}, { timestamps: true });

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
