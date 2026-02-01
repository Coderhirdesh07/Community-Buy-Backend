const express = require("express");
const router  = express.Router();
const {handleUserRegistration,
    handleUserDelete,
    handleUserLogin,
    handleUserLogout,
    handleUserGetInfo
} = require("../controller/user.controller");

const {verifyJwt} = require("../middleware/auth.middleware");

router.post("/create",handleUserRegistration);
router.post("/login",handleUserLogin);
router.post("/logout",verifyJwt,handleUserLogout);
router.get("/user-info/:id",verifyJwt,handleUserGetInfo);
router.delete("/user/delete",verifyJwt,handleUserDelete);

module.exports = router;