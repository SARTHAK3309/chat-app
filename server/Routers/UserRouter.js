import { Router } from "express";
import { loginUser, registerUser,searchUser, getUserDetails, pinChat, unpinChat, archiveChat, unarchiveChat } from "../Controllers/UserControllers.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
const router = Router()

router.post("/register", registerUser), 
router.post("/login", loginUser)
router.get("/search", authMiddleware,  searchUser)
router.get("/", authMiddleware, getUserDetails)
router.patch("/pin-chat", authMiddleware, pinChat)
router.patch("/unpin-chat", authMiddleware, unpinChat)
router.patch("/archive-chat", authMiddleware, archiveChat)
router.patch("/unarchive-chat", authMiddleware, unarchiveChat)

export default router