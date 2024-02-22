import mongoose, { Schema }  from "mongoose";
const ChatSchema = new mongoose.Schema({
  isGroupChat: {
    type: Boolean,
    required: true
  },
  users: [
    {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
  ],
  chatName: {
    type: String,
    required: true
  },
  latestMessage : {
    type : Schema.Types.ObjectId,
    ref : 'Message'  
  },
  groupAdmin : {
    type : Schema.Types.ObjectId,
    ref : 'User'
  }
  
}, {
  timestamps : true
});

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat
