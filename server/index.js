import express from "express"
import mongoose, { connect } from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import chats from "./temp/data.js"
import { connectDB } from "./config.js"

dotenv.config()
const app = express()


connectDB()
app.use(cors())

app.get('/', (req,res)=>{
    console.log("API is working")
    res.send("hello")
})


app.get("/api/chats", (req, res)=>{
    res.json(chats)
})
app.get("/api/chats/:id", (req, res)=>{
    const {id} = req.params
    const chat = chats.filter(chat => chat._id === id)
    return res.json(chat)
})
app.listen(process.env.PORT, (req, res)=>{
    console.log("server started on port " + process.env.PORT)
})