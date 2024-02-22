import User from "../Models/UserModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const generateToken = (user) => {
    const User = { ...{ ...user }._doc }
    delete User.password
    delete User.imageURL
    delete User.provider
    return jwt.sign(User, process.env.JWT_SECRET_KEY)
}
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, imageURL } = req.body
        if (!username || !email || !password)
            throw new Error("Some fields are misssing")
        const newUser = new User(req.body)
        const registeredUser = await newUser.save(req.body)
        const token = generateToken(registeredUser)
        return res
            .cookie(
                "token", token, 
            )
            .json({
                success: true,
                user: registeredUser,
                token : token
            })
    }
    catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}


export const loginUser = async (req, res) => {
    try {
        const {email, password } = req.body
       if(!email)throw new Error("Email is missing")
       if(!password)throw new Error("Password is missing")
        const loginUser = await User.findOne({email : req.body.email})
        if(!loginUser) throw new Error("User does not exist")
        const validatePassword = await bcrypt.compare(password, loginUser.password)
        if(!validatePassword) throw new Error("Passwords dont match")
        const token = generateToken(loginUser)
        return res
            .cookie(
                "token", token
            )
            .json({
                success: true,
                user: loginUser,
                token : token
            })
    }
    catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}