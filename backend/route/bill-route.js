const express = require("express");
const bodyParser = require("body-parser");
const {createBill}= require("../controller/bill-controller")

const billRouter = express.Router();
billRouter.use(bodyParser.json());

billRouter.post("/addtobill", createBill);

module.exports= billRouter;
