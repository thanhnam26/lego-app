const express = require("express");
const bodyParser = require("body-parser");

const { createNewProduct,getAllProduct , getProductByCategory,getDetail, getAll} = require("../controller/product-controller");

const productRouter = express.Router();
productRouter.use(bodyParser.json());

productRouter.post("/createProduct", createNewProduct);

productRouter.get("/listall", getAllProduct);
productRouter.get("/category/:categoryId", getProductByCategory)
productRouter.get("/detail/:id", getDetail)
productRouter.get("/allProduct", getAll)

module.exports = productRouter;