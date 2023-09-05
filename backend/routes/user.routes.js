const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
//auth
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

// user DB
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.patch("/colleclistpatch/:id", userController.userColleclistPatch);
router.delete("/colleclistdelete/:id/:malid", userController.userColleclistDelete);
router.patch("/colleclistbookmarkpatch/:id/:malid", userController.userBookMarkPatch);
router.patch("/colleclistpopularitypatch/:id/:malid", userController.userPopularityPatch);
module.exports = router;