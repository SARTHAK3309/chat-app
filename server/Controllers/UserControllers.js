import User from "../Models/UserModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import Chat from "../Models/ChatModel.js"
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

        const newAiChat = new Chat({
            isGroupChat : false,
            users : [registeredUser._id, "65d7e893017bfcc998f2187d"],
            chatName : "Assistant",
            groupAdmin : registeredUser._id
        }
        )

        const newChat = await newAiChat.save()
        // enter this chat in unarchived chats
        console.log(newChat, registeredUser)
        const registeredUserWithChat = await User.findOneAndUpdate(
            { _id: registeredUser._id },
            { $push: { unarchivedChats: newChat._id } }, // Push 'newRole' into the 'roles' array
            { new: true } // Options: Return the updated document
          )


        return res
            .cookie(
                "token", token, 
            )
            .json({
                success: true,
                user: registeredUserWithChat,
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
       if(email === "ai@gmail.com")
            throw new Error("SECURITY BREACH")
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



export const getUserDetails = async(req, res)=>{
    
    try
    {
    const response = await User.findOne(
        {
            _id :  req.user._id
        }
    )
    .populate({
        path: 'archivedChats',
        populate: {
          path: 'users',
          model: 'User' // Name of the User model
        }
      })
      .populate({
        path: 'unarchivedChats',
        populate: {
          path: 'users',
          model: 'User' // Name of the User model
        }
      })
      .populate({
        path: 'pinnedChats',
        populate: {
          path: 'users',
          model: 'User' // Name of the User model
        }
      })
    
    return res.json(
        {
            success : true,
            user : response 
        }
    )
    }
    catch(e){
        return res.json({
            success : false,
            message : e.message
        })
    }
}



export const pinChat = async(req, res)=>{
    try{
        const {id} = req.query
        console.log("reached")
    const updatedDocument = await User.findOneAndUpdate(
        // Filter criteria to match the document containing the arrays
        { _id: req.user._id },
        
        // Update operations
        {
          $push: { pinnedChats: {_id : id} }
        },
        
        // Options to return the modified document
        { 
          returnOriginal: false 
        }
      );



      return res.json(
        {
            user : updatedDocument,
            success : true
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






export const unpinChat = async(req, res)=>{
    console.log("sakjndfjidsnf")
    try{
        const {id} = req.query
    const updatedDocument = await User.findOneAndUpdate(
        // Filter criteria to match the document containing the arrays
        { _id: req.user._id },
        
        // Update operations
        {
          $pull: { pinnedChats: id },
        },
        
        // Options to return the modified document
        { 
          returnOriginal: false 
        }
      );


      return res.json(
        {
            user : updatedDocument,
            success : true
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


export const archiveChat = async(req, res)=>{
    try{
        const {id} = req.query
        let doc = await User.findOneAndUpdate(
            { _id: req.user._id }, // req.user._id is the ID of the user document you want to update
            { 
                $pull: { pinnedChats: id },
              
            },
            { new: true } // To return the updated document
        );
        
        doc = await User.findOneAndUpdate(
            {_id: req.user._id},
            { 
                $pull: { unarchivedChats: id },
              
            },
            { new: true } // To return the updated document
        );
        
        doc = await User.findOneAndUpdate(
            {_id: req.user._id},
            { 
                $push: { archivedChats: id },
              
            },
            { new: true } // To return the updated document
        );



      return res.json(
        {
            user : doc,
            success : true
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


export const unarchiveChat = async(req, res)=>{
    try{
        const {id} = req.query
        let doc = await User.findOneAndUpdate(
            {_id: req.user._id}, // req.user._id is the ID of the user document you want to update
            { $pull: { archivedChats: id } },
            {new : true}
        );
        
        doc = await User.findOneAndUpdate(
            {_id: req.user._id},
            { $pull: { pinnedChats: id } },
            {new : true}

        );
        
        doc = await User.findOneAndUpdate(
            {_id: req.user._id},
            { $push: { unarchivedChats: id }},
            {new : true}

        );



      return res.json(
        {
            user : doc,
            success : true
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

