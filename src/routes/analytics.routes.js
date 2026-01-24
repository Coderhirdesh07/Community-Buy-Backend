const express = require("express");
const router  = express.Router();
const {handleGetAdminAnalytics} = require("../controller/analytics.controller");
const {verifyRole}  = require("../middleware/role.middleware");
const {verifyJwt} = require("../middleware/auth.middleware");

router.get("/all-info",verifyJwt,verifyRole,handleGetAdminAnalytics);

module.exports = router;