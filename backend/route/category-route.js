const express = require("express");
const bodyParser = require("body-parser");

const { createNewCategory,getAllCategory } = require("../controller/category-controller");

const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());

categoryRouter.post("/create",createNewCategory)
categoryRouter.get("/list",getAllCategory)
module.exports = categoryRouter;