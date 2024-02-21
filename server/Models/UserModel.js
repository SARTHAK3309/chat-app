import mongoose, { Schema }  from "mongoose";
const UserSchema = new mongoose.Schema({
  username : {
    type : String,
    required : true,
    unique : true,
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
  }
}, {
  timestamps : true
});

const User = mongoose.model('User', UserSchema);

export default User
