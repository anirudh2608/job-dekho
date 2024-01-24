import express from "express";

import {
    getCurrentUser,
    login,
    logout,
    resgister,
    update
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

const router = express.Router()

router.route("/register").post(resgister)

router.route("/login").post(login)

router.get('/logout', logout);

router.route("/update").patch(authenticateUser, update)

router.route("/getCurrentUser").post(getCurrentUser)

export default router