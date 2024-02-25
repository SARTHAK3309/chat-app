import axios from "axios"

// function takes a two person chat and just returns the output of sender on screen
export const getSender = (users, user)=>(user?._id === users[0]?._id  ? users[1]?.username : users[0]?.username)

const headerOptions = {
    headers:{
      'Authorisation' : `Bearer ${localStorage.getItem('token')}`
    }
  }

export const unpinChat = async(chat, user)=>{
    try{
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/unpin-chat?id=${chat._id}`
        const {data} = await axios.patch(url, {},  headerOptions)
        if(data.success == false)throw new Error("something went wrong")
        return data.user
    }
    catch(e){

    }
}



export const pinChat = async(chat, user)=>{
    try{
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/pin-chat?id=${chat._id}`
        const {data} = await axios.patch(url, {},  headerOptions)
        if(data.success == false)throw new Error("something went wrong")
        return data.user
    }
    catch(e){

    }
}

export const archiveChat = async(chat, user)=>{
    try{
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/archive-chat?id=${chat._id}`
        const {data} = await axios.patch(url, {},  headerOptions)
        if(data.success == false)throw new Error("something went wrong")
        return data.user
    }
    catch(e){

    }
}


export const unarchiveChat = async(chat, user)=>{
    try{
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/unarchive-chat?id=${chat._id}`
        const {data} = await axios.patch(url, {},  headerOptions)
        if(data.success == false)throw new Error("something went wrong")
        return data.user
    }
    catch(e){

    }
}

