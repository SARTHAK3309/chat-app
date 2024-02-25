import Chat from "../Models/ChatModel.js"
import User from "../Models/UserModel.js";
export const createGroupChat = async(req, res)=>{

    
    try{

        const users = JSON.parse(req.body.users)
        if(!users)throw new Error("Please add some users")
        if(users.length === 1)throw new Error("Please add some users")
        //check whether group title is present
        if(!req.body.chatName)throw new Error("Please enter thre chat name")
            
        const newChat = new Chat( {
            isGroupChat : true, 
            users : users,
            chatName : req.body.chatName,
            groupAdmin : req.user._id
        })
        
        let response = await newChat.save()
        response = await response.populate('users')
        console.log(response._id)
        console.log("fdf", users)
        for(let id of users){
            await User.findOneAndUpdate(
                //
                {_id : id},
                 {$push : {unarchivedChats : response._id}}
                )
        }
        
        return res.json(
            {
                success : true,
                chat : response
            }
        )
    }
    catch(e){
        return res.json(
            {
                success: false,
                message : e.message
            }
        )
    }
 
}
