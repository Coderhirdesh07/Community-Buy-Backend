const express = require("express");
const router  = express.Router();
const { handleProductDelete,
    handleProductRegistration,
    handleProductInfo
} = require("../controller/product.controller.js");


router.post("/create",handleProductRegistration);
router.get("/get-info/:id",handleProductInfo);
router.delete("/delete/:id",handleProductDelete);

module.exports = router;