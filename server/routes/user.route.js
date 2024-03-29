import { Router } from "express";
import { getUserDetails, loginUser, registerUser } from "../controllers/user.controller.js";
import variefyUser from "../middlewares/variefyUser.middleware.js";
import { createGroup } from "../controllers/group.controller.js";



const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/details').get(variefyUser, getUserDetails)
router.route('/newgroup').post(createGroup)

export default router