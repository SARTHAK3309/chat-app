import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import chats from "./temp/data.js"
import { connectDB } from "./config.js"
import  jwt  from "jsonwebtoken"
import {authMiddleware} from "./middlewares/AuthMiddleware.js"
import UserRouter from "./Routers/UserRouter.js"
import ChatRouter from "./Routers/ChatRouter.js"
dotenv.config()
const app = express()


connectDB()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api/user", UserRouter)

app.use("/api/chat", authMiddleware, ChatRouter)


///checking for authorisation
app.get("/", authMiddleware, (req, res)=>{
    return res.json( {
        "success" : true,
        "message" : "passed"
    })
})
app.get("/api/chats/:id", (req, res)=>{
    const {id} = req.params
    const chat = chats.filter(chat => chat._id === id)
    return res.json(chat)
})
app.listen(process.env.PORT, (req, res)=>{
    console.log("server started on port " + process.env.PORT)
})