const express = require("express");
const router  = express.Router();
const {handleNewOrder,handleGetAllOrder} = require("../controller/order.controller");


router.post("/create",handleNewOrder);
router.get("/get/:userid",handleGetAllOrder);


module.exports = router;