const mongoose = require("mongoose"); 

const Category = require("./category-model");
const Product = require("./product-model");
const Feedback= require("./feedback-model")
const User = require("./user-model");
const Bill = require("./bill-model")
const Role= require("./role-model")


//khoi tao doi tuong CSDL
const db = {};

//Bo sung cac Entity object vao DB
db.Category = Category;
db.Product = Product;
db.Feedback = Feedback;
db.User = User;
db.Bill = Bill;
db.Role = Role;

//Hanh vi thuc hien ket noi toi CSDL
db.connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGODB_URI) 
       .then(() => console.log("Connect to MongoDB successfully"));
    } catch (error) {
        next(error);
        process.exit();
    }
}
module.exports = db;