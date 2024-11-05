
const mongooes = require("mongoose");
const Schema = mongooes.Schema;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  created_time: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_time: {
    type: Date,
    required: true,
    default: Date.now,
  },
  delete_id: {
    type: Number,
    default: 0
  },
  status: {
    type: Number,
    default: 0,
  },
});

const Category = mongooes.model("Categories", categorySchema);

module.exports = Category;
