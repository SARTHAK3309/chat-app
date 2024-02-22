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

export const searchUser = async(req, res)=>{
    try{
        const {search} = req.query
        if(search === "")
        return res.json({
            success : true,
            users : []
        })
       const users = await User.aggregate([
            // Stage 1: Match users containing the provided word
            {
              $match: {
                $or: [
                  { username: { $regex: search, $options: 'i' } }, // Case-insensitive regex match
                  { email: { $regex: search, $options: 'i' } }     // Case-insensitive regex match
                ]
              }
            },
            // Stage 2: Add a calculated field for the sorting order
            {
              $addFields: {
                sortScore: {
                  $switch: {
                    branches: [
                      // Case 1: Exact match with the provided search gets a higher score
                      { case: { $or: [{ $eq: ["$username", search] }, { $eq: ["$email", search] }] }, then: 1 },
                      // Case 2: Other matches with the provided search get a lower score
                      { case: { $or: [{ $ne: [{ $indexOfCP: ["$username", search] }, -1] }, { $ne: [{ $indexOfCP: ["$email", search] }, -1] }] }, then: 2 },
                      // Case 3: All other users get a score of 3
                    ],
                    default: 3
                  }
                }
              }
            },
            // Stage 3: Sort users based on the calculated score
            { $sort: { sortScore: 1 } },
            // Stage 4: Project to remove the calculated field
            { $project: { sortScore: 0 } }
            ,
            //stage 5 : remove the current logged in user
            {
                $match : {email: {$ne: req.user.email}}
            },
            {
                $limit : 20
            }
          ])

        return res.json(
            {
                success : true,
                users : users
            }
        )

    }
    catch(e){
        
        return res.json(
            {
                success : false,
                message : e.message
            }
        )
    }
}