const express = require("express");
const router  = express.Router();
const {handleNewOrder,handleGetAllOrder} = require("../controller/order.controller");
const {verifyJwt} = require("../middleware/auth.middleware.js");


router.post("/create",verifyJwt,handleNewOrder);
router.get("/get/:userid",verifyJwt,handleGetAllOrder);


module.exports = router;