import mongoose, { Schema }  from "mongoose";
const MessageModel = new mongoose.Schema({
    isImage: {
        type: Boolean,
        default : false
    },
      sender: {
            type : Schema.Types.ObjectId,
            ref : 'User',
            required : true
        }
      ,
      content : {
        type : String,
        required : true,
        trim : true
      },
      chat: {
        type: String,
        required: true
        }
  
}, {
  timestamps : true
});

const Message = mongoose.model('Message', MessageModel);

export default Message
