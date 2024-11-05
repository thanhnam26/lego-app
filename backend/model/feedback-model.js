const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Role schema
const feedbackSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      review: {
        type: String,
        required: true,
      },  
      delete_id: {
        type: Number,
        default:0
      },    status: Number,
},{timestamps:true});

// Create the Role model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
