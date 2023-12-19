const multer = require("multer");
const router = require("express").Router();
const upload = multer({ dest: "../utils/images/" });
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
router.delete(
  "/colleclistdelete/:id/:malid",
  userController.userColleclistDelete
);
router.patch(
  "/colleclistbookmarkpatch/:id/:malid",
  userController.userBookMarkPatch
);
router.patch(
  "/colleclistcommentarypatch/:id/:malid",
  userController.userCommentaryPatch
);
router.patch(
  "/colleclistpopularitypatch/:id/:malid",
  userController.userPopularityPatch
);
router.patch("/colleclistleveladdpatch/:id", userController.userLevelAddPatch);
router.patch(
  "/colleclistlevelremovepatch/:id",
  userController.userLevelRemovePatch
);
// USER CHANGES

router.patch("/emailchange/:id", userController.userEmailChange);
router.patch("/pseudochange/:id", userController.userPseudoChange);
router.patch("/passwordchange/:id", userController.userPasswordChange);
router.patch("/sendidea/:id", userController.userSendIdea);
router.patch("/selectuniverse/:id", userController.userSelectUniverse);
router.patch(
  "/selectvillageisland/:id",
  userController.userSelectVillageIsland
);
router.patch(
  "/selectmarineorpirate/:id",
  userController.userSelectMarineOrPirate
);
router.patch(
  "/bgpatch/:id",
  upload.single("image"),
  userController.userBgPatch
);
router.patch(
  "/imgpatch/:id",
  upload.single("image"),
  userController.userImgPatch
);
module.exports = router;
