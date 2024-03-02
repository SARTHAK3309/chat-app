import React, { useState } from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";

const Header = ({sidebar, setsidebar, user}) => {
  const [open, setopen] = useState(false)
  return (
    <div className="header h-[8vh] bg-white flex items-center px-2 justify-between space-be">
    <input onClick = {()=>{setsidebar(!sidebar)}}placeholder = "Search User" type = "text" className='w-[40%] cursor-pointer text-center border-solid border-2 border-black relative rounded-xl p-1'/ >
    <FaMagnifyingGlass   onClick = {()=>{setsidebar(!sidebar)}} className='absolute left-4 cursor-pointer'/>
    <div>CHAT-APP</div>
    {/* <div className='flex justify-center items-center'> */}
      <img src = {user?.imageURL} onClick={e => setopen(!open)}  height = "40px" width = "40px" style = {{display : (open ? "none" : "block")}}/> 
    <select onClick={e => setopen(!open)} style = {{display : (open ? "block" : "none")}}> 
      <option>Profile</option>
      <option>Logout</option>

      </select>
    {/* </div> */}
    </div>
  )
}

export default Header