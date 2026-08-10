import { Router } from "express"
import registerUser from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.js"
import loginUser from "../controllers/user.controller.js"
import { verify } from "jsonwebtoken"
import { verifyJWT } from "../middlewares/auth.middleware.js"


const router = Router()

router.route("/register").post(
  // inject middleware
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
  registerUser
)

router.route("/login").post(loginUser)


// secured routes
router.route("/logout").post(verifyJWT, logoutUser)



export default router