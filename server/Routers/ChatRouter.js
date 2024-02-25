import { Router } from "express";
import { createGroupChat } from "../Controllers/ChatControllers.js";
const router = Router()

router.post("/create-group", createGroupChat)
// router.post("/login", loginUser)
// router.get("/search", authMiddleware,  searchUser)


export default router