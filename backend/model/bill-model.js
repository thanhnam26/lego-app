const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema({

  total_cost: {
    type: Number,
    required: true,
  },
  payment: {
    type: String,
  },
  status: {
    type:Number,
    default: 0
  },
  discount: Number,
  product_list: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      nameP: {
        type: String,
        required: true,
      },
      quantityP: {
        type: Number,
        required: true,
      },
      priceP: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      _id: false,
    },
  ],
  delete_id: {
    type: Number,
    default: 0
  },
},{timestamps:true});

const Bill = mongoose.model("Bills", billSchema);
module.exports = Bill;
