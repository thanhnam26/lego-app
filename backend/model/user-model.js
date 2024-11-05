// models/User.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        dob: { type: Date },
        phone: { type: String, unique: true },
        address: { type: String },
        avatar: { type: String },
        role: { 
            type: String, 
            required: true, 
            enum: ["admin", "customer"], // Only allow "admin" and "customer" roles
            default: "customer" // Default to "customer" if no role is specified
        },
        status: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
