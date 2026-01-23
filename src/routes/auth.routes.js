const express = require("express");
const router  = express.Router();
const {handleUserRegistration,
    handleUserDelete,
    handleUserLogin,
    handleUserLogout,
    handleUserGetInfo} = require("../controller/user.controller");


router.post("/create",handleUserRegistration);
router.post("/login",handleUserLogin);
router.post("/logout",handleUserLogout);
router.get("/user-info/:id",handleUserGetInfo);
router.delete("/user-info/delete/:id",handleUserDelete);

module.exports = router;