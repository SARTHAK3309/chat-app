import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { RiInboxUnarchiveFill, RiPinyinInput } from "react-icons/ri";
import SideBar from './components/SideBar';
import Header from './components/Header';
import PinnedChat from './components/PinnedChat';
import UnarchiveChat from './components/UnarchiveChat';
import { archiveChat, pinChat, unarchiveChat, unpinChat } from './helper';
import ArchiveChat from './components/ArchiveChat';
import WelcomeChatbox from './components/WelcomeChatbox';
import AiChatbox from './components/AiChatbox';
import GroupChatbox from './components/GroupChatbox';
import PersonalChatbox from './components/PersonalChatbox';

const HomePage = () => {
  const [sidebar, setsidebar] = useState(false)
  const [searchedUsers, setsearchedUsers] = useState([])
  const [user, setUser] = useState({})
  const [isarchive, setIsarchive] = useState(false) // tells whether archive chats are opened or not
  const [selectedchat, setSelectedchat] = useState()
  const [totalunarchivedchats, setTotalunarchivedchats] = useState([])
  const [archivedChats, setarchivedchats] = useState([])

  useState(()=>{
    console.log("lod", selectedchat)
  }, [selectedchat])
  const getTotalunarchivedchats = (pinnedChats, unarchivedChats) => {
    const pin = pinnedChats?.map(chat => ({ ...chat, pin: true }))
    const unarchive = unarchivedChats?.map(chat => ({ ...chat, pin: false }))
    const seenIds = new Set();

    return [...pin, ...unarchive].filter(obj => {
      if (!seenIds.has(obj._id)) {
        seenIds.add(obj._id);
        return true;
      }
      return false;
    });

  }

  const handleunPin = (chat, user,e) => {
 
    unpinChat(chat, user)
    let prev = [...totalunarchivedchats]
    prev = prev.filter(obj => obj._id !== chat._id)
    prev.push({ ...chat, pin: false })
    setTotalunarchivedchats(prev)

  }
  const handlePin = (chat, user,e) => {
    pinChat(chat, user)
    let prev = [...totalunarchivedchats]
    prev = prev.filter(obj => obj._id !== chat._id)
    prev.unshift({ ...chat, pin: true })
    setTotalunarchivedchats(prev)
  }
  const handleunArchive = (chat, user,e) => {

    setSelectedchat(null)
    unarchiveChat(chat, user)
    let prev = [...archivedChats]
    prev = prev.filter(obj => obj._id !== chat._id)
    setarchivedchats(prev)
    setTotalunarchivedchats([...totalunarchivedchats, {
      ...chat, pin:false
    }])
  }
  const handleArchive = (chat, user,e) => {

      setSelectedchat(null)
    archiveChat(chat, user)
    let prev = [...totalunarchivedchats]
    prev = prev.filter(obj => obj._id !== chat._id)
    setTotalunarchivedchats(prev)
    const temp = [...archivedChats]
    temp.unshift(chat)
    setarchivedchats(temp)
  }
  useEffect(() => {
    const response = JSON.parse(localStorage.getItem('user'))
    setTotalunarchivedchats(getTotalunarchivedchats(response.pinnedChats, response.unarchivedChats))
    setarchivedchats(response.archivedChats)
    console.log(response)
    setUser(response)
  }, [])
  return (
    <div className='min-h-[100vh] min-w-[100vw] color '>

      {/* <div className='absolute inset-0 bg-[black] '></div> */}

      <SideBar sidebar={sidebar} setsidebar={setsidebar} searchedUsers={searchedUsers} setsearchedUsers={setsearchedUsers} />
      <Header sidebar={sidebar} setsidebar={setsidebar} />

      <div className='p-2 h-[92vh] gap-2 flex  items-center'>

        <div className='w-[100%] sm:w-[30%] block bg-white h-[100%] rounded-md p-2 text-xl'>
          <div className='flex justify-between items-center mb-2'>
            <div>MY CHATS</div>
            <button type="button" class="text-white px-5 py-2 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 text-3xl rounded-full  text-center font-extrabold"> + </button>

          </div>
          <div onClick={() => setIsarchive(!isarchive)} className='flex justify-start place-items-center gap-4 text-xl bg-slate-300 p-2 mb-4 rounded-md cursor-pointer hover:bg-slate-400 tracking-wide duration-100' >
            <RiInboxUnarchiveFill />
            <div >{isarchive ? <>ye hain archived CHATS</> : <>ye hai unar CHATS</>}</div>
          </div>




          {
            isarchive ?
              archivedChats?.map((chat, idx) => (
                <>

                  <ArchiveChat user={user} chat={chat} selectedchat = {selectedchat} setSelectedchat = {setSelectedchat} handleunArchive={handleunArchive} />

                </>
              ))
              :
              totalunarchivedchats?.map((chat, idx) => (

                <>

                  {
                    chat.pin ?
                      <PinnedChat chat={chat} user={user} selectedchat = {selectedchat} setSelectedchat = {setSelectedchat} handleunPin={handleunPin} handleArchive={handleArchive} />
                      :
                      <UnarchiveChat chat={chat} user={user} selectedchat = {selectedchat} setSelectedchat = {setSelectedchat} handlePin={handlePin} handleArchive={handleArchive} />
                  }

                </>
              ))

          }





        </div>



          {/* chatbox */}
        <div className='w-[100%] sm:w-[70%] hidden sm:block overflow-auto bg-white h-full rounded-md p-2'>
             {/* chatbox Header */}
         <div className='bg-[grey] mb-1 min-h-[6%] rounded-md flex items-center px-2 '>
            CHAT HEADER
          </div>
          {
            selectedchat == null ? <WelcomeChatbox /> : 
            (selectedchat?.users[0].email === "ai@gmail.com" || selectedchat?.users[1].email === "ai@gmail.com") ? <AiChatbox /> :
            (selectedchat?.isGroupChat) ? <GroupChatbox /> :
            <PersonalChatbox />
          }
          </div>


 {/* end of chatbox */}

      </div>
    </div>
  )
}

export default HomePage