const express = require("express");
const router  = express.Router();
const {handleCreateNewOrder,handleGetAllOrder} = require("../controller/order.controller");
const {verifyJwt} = require("../middleware/auth.middleware.js");


router.post("/create",verifyJwt,handleCreateNewOrder);
router.get("/get/:userid",verifyJwt,handleGetAllOrder);


module.exports = router;