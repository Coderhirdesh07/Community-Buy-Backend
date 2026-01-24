const express = require("express");
const router  = express.Router();
const { handleProductDelete,
    handleProductRegistration,
    handleProductInfo
} = require("../controller/product.controller.js");
const {verifyRoleAdmin} = require("../middleware/role.middleware.js");
const {verifyJwt} = require("../middleware/auth.middleware.js");


router.post("/create",verifyJwt,verifyRoleAdmin,handleProductRegistration);
router.get("/get-info/:id",verifyJwt,handleProductInfo);
router.delete("/delete/:id",verifyJwt,verifyRoleAdmin,handleProductDelete);

module.exports = router;