import React, { useEffect, useState } from 'react'
import axios from "axios"
const HomePage = () => {
    const [chats, setChats] = useState([])
    useEffect(()=>{
      (
        async function(){
            try{
            const url = `${import.meta.env.VITE_BACKEND}/api/chats`
            const {data} = await axios.get(url)
            setChats(data)
            }
            catch(err){
                console.log(err.message)
            }
        }
      )()
    }, [])
  return (
    <div>
        
    </div>
  )
}

export default HomePage