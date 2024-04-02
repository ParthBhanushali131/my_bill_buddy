import { Router } from "express";
import { getUserDetails, loginUser, logout, registerUser } from "../controllers/user.controller.js";
import {variefyUser} from "../middlewares/variefyUser.middleware.js";
import {getUserIdsFromEmails} from "../middlewares/getUserIdsFromEmails.middleware.js";
import { createGroup, fetchGroups } from "../controllers/group.controller.js";



const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logout)
router.route('/details').get(variefyUser, getUserDetails)
router.route('/newgroup').post(getUserIdsFromEmails,(req, res) => createGroup(req, res));
router.route('/fetchGroups').get(fetchGroups)


export default router