import { Router } from "express";
import { loginUser, registerUser,searchUser } from "../Controllers/UserControllers.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/search", authMiddleware,  searchUser)


export default router