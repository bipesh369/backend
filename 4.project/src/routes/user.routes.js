import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import refreshAccessToken from "../controllers/user.controller.js"
import changeCurrentPassword from "../controllers/user.controller.js"

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    userController.registerUser)

router.route("/login").post(
    userController.loginUser)

router.route("/logout").post(
    verifyJWT,
    userController.logoutUser)

router.route("/refresh-token").post(
    userController.refreshAccessToken)

router.route("/change-password").post(
    verifyJWT, 
    userController.changeCurrentPassword)

router.route("/current-user").get(
    verifyJWT, 
    userController.getCurrentUser)

router.route("/update-account").patch(
    verifyJWT, 
    userController.updateAccountDetails)

router.route("/avatar").patch(
    verifyJWT, upload.single("avatar"), 
    userController.updateUserAvatar)

router.route("/cover-image").patch(
    verifyJWT, upload.single("coverImage"),
    userController.updateCoverImage)

router.route("/c/:username").get(
    verifyJWT, 
    userController.getUserChannelProfile)    

router.route("/watch-history").get(
    verifyJWT, 
    userController.getWatchhistory)    


export default router;