const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user DB
router.get("/:id", userController.userInfo);
router.patch("/colleclistpatch/:id", userController.userColleclistPatch);
router.delete("/colleclistdelete/:id/:malid", userController.userColleclistDelete);
module.exports = router;