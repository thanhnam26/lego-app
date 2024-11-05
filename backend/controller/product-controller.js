const Product = require("../model/product-model");
const mongoose = require("mongoose");
const db = require("../model");
const createNewProduct = async (req, res, next) => {
  try {
    const products = req.body; // Giả sử req.body là một mảng sản phẩm

    // Duyệt qua từng sản phẩm và lưu vào cơ sở dữ liệu
    const savedProducts = await Product.insertMany(products); // Sử dụng insertMany để thêm nhiều sản phẩm
    res.status(201).json(savedProducts);
  } catch (error) {
    next(error);
  }
};



const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
const getProductByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
  }

    const products = await Product.find({ category_id: categoryId });
    
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};


const getDetail = async (req, res, next) => {
  try {
    const product = await db.Product.findById(req.params.id).populate(
      "category_id"
    );
    res.status(200).json({
      ...product._doc,
      category: product.category_id.name,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getAll= async(req, res, next)=>{
  try {
    const {search="", page= 1, limit= 6}= req.query;
    const searchLower= search.toLowerCase();
    const filteredProduct= await db.Product.find({
      $or:[
        {
          "name": {$regex: searchLower, $options:"i"}
        }
      ]
    })
    const startIndex=(page-1)* limit;
    const endIndex= page*limit;
    const currentProducts= filteredProduct.slice(startIndex, endIndex);
    const totalProducts= filteredProduct.length;
    res.status(200).json({
      products: currentProducts,
      totalProducts,
      currentProducts: parseInt(page,10),
      totalPages: Math.ceil(totalProducts/limit)
    })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  createNewProduct,
  getAllProduct,
  getProductByCategory,
  getDetail,
  getAll,
};
