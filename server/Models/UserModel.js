import mongoose, { Schema }  from "mongoose";
import bcrypt from "bcrypt"
const UserSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
    min : [5, "Username should be betweem 5 to 20 characters"],
    max :[20, "Username should be betweem 5 to 20 characters"]
  },

  email : {
    type : String, 
    required : true,
    unique : true
  },

  password : {
    type : String, 
    required : true,
  },
  imageURL : {
    type : String,
    default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  },
  archivedChats : [
    {
      type : Schema.Types.ObjectId,
      ref : 'Chat'
    }
  ],

  unarchivedChats : [
    {
      type : Schema.Types.ObjectId,
      ref : 'Chat'
    }
  ],
  pinnedChats : [
    {
      type : Schema.Types.ObjectId,
      ref : 'Chat'
    }
  ],
  
  provider : {
    type : String, 
    default : "local"
  }
}, {
  timestamps : true
});


//hash passwords before saving and only when password field is changed
UserSchema.pre('save', async function (next) {
  const user = this;
  //check whether passsword field has changed
  if (!user.isModified('password')) 
    return next();
  

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});


const User = mongoose.model('User', UserSchema);

export default User
