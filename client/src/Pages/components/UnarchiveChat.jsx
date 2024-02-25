import React, { useRef, useState } from 'react'
import { getSender, pinChat, unarchiveChat, unpinChat } from '../helper'
import { useSearchParams } from 'react-router-dom'
import { IoMdArrowDropdown } from "react-icons/io";
import { IoPin } from "react-icons/io5";


const UnarchiveChat = ({ chat, user, handlePin, handleArchive,  selectedchat, setSelectedchat  }) => {
  
    const [open, setOpen] = useState(false)
    return (
        <div onClick = {()=>{setSelectedchat(chat)}} className='flex justify-between place-items-center gap-4 w-[90%] mx-auto text-sm   p-2 mb-2 rounded-md cursor-pointer hover:bg-slate-400 tracking-wide durati  on-100' style = {{backgroundColor : selectedchat?._id === chat?._id ? "#b8b3a7" : "grey"}}>
            <div className='flex flex-col'>
                <div>
                    {chat?.isGroupChat ? <> {chat?.chatName} </> :  getSender(chat?.users, user) === "ai" ? <>Assistant</>
                    : <>getSender(chat?.users, user)</>
}
                </div>

                <div>
                    dfds
                </div>
            </div>


            <div className='flex items-center'>
                <div class="relative">
                <button onClick={(e) => {e.stopPropagation();  setOpen(!open)}} class="px-1 py-1 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <IoMdArrowDropdown className={`text-sm duration-100 transform ${open ? 'rotate-180' : ''}`}  />
                </button>

                <div class="absolute z-[1.2] w-[7rem] bg-white rounded-lg right-1 shadow-lg" style={{ display: `${open ? "block" : "none"}` }}>
                    <div class="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={e=>handlePin(chat, user,e)}>Pin</div>
                    <div class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Delete</div>
                    <div class="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={e=>handleArchive(chat, user,e)}>Archive</div  >
                </div>
            </div>
            </div>


        </div>
    )
}

export default UnarchiveChat