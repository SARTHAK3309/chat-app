import React, {useEffect, useState} from 'react';
import axios from "axios"
import { useForm } from "react-hook-form"
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width : '50vw',
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems : 'center',
    borderColor : 'black',
    borderRadius : '3%',
    maxHeight : '99vh',
    overflow : 'auto'
  },
};

Modal.setAppElement('#root');

export default function GroupChatModal({isGroupChatModalOpen, setIsgroupChatModalOpen, user, totalunarchivedchats, setTotalunarchivedchats}) {
    const headerOptions = {
        headers:{
          'Authorisation' : `Bearer ${localStorage.getItem('token')}`
        }
      }
    const [searchedUsers, setsearchedUsers] = useState([])
    const [name, setname] = useState("")
    const [search, setsearch] = useState("")
    const [groupUsers, setgroupUsers] = useState([user])
    useEffect(()=>{
        if(isGroupChatModalOpen === false)
         {   setsearchedUsers([])
            setgroupUsers([])}
    }, [isGroupChatModalOpen])
  function closeModal() {
    setIsgroupChatModalOpen(prev => false);
  }

  const handleSearch = async(e)=>{
    try{
        
      setsearch(e.target.value)
      let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/search?search=${e.target.value}`, headerOptions)
      response = response.data
      if(response.success == false)throw new Error(response.message)
      setsearchedUsers(prev=>response.users)
    }
    catch(e){
      toast(e.message)
    }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
            if(name === "")toast("Please enter a chat name")
            else if(groupUsers.length <= 1)toast("Enter atleast one user")
            else{
                
                try{
                    let {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/chat/create-group`, { chatName : name , users : JSON.stringify([user, ...groupUsers])  },headerOptions)
                    const newChat = {...data.chat, pin : false}
                    const temp = [...totalunarchivedchats]
                    let index = -1
                    temp.forEach((ele, idx)=>{
                        if(ele.pin === false){
                            if(index === -1) index=idx;
                            
                        }
                    })
        
                    if(index != -1)
                    temp.splice(index, 0, newChat)
                    else
                    temp.push(newChat)
                    setTotalunarchivedchats(temp)
                    closeModal()
                }

                catch(e){
                    toast(e.message)
                }
        
            }
    }

   

  return (
    <div>
      <Modal
        shouldCloseOnOverlayClick={true}
        isOpen={isGroupChatModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ToastContainer />
        <div className='text-3xl'>
            CREATE GROUP CHAT
        </div>

        <form  onSubmit = { e=>handleSubmit(e)} className='mt-5'>

       <input onChange = {e=>setname(e.target.value.trim())}className='w-[100%] border-2 border-black p-2 rounded-md'   placeholder='Enter Chat Name'></input> 
       <input  onChange={e => handleSearch(e)} className='w-[100%] border-2 border-black mt-5 mb-2.5 p-2 rounded-md' placeholder='Add Users eg: John, Piyush'></input> 
       
        {/* displayed users */}

        <div className='flex justify-center items-center flex-wrap gap-3'>
  {
    groupUsers?.map(element => (
      (element?._id !== user?._id) && 
      <div className='bg-[pink] flex justify-end items-center gap-5 p-1 rounded-lg' key={element._id}>
        <div>{element?.username}</div>
        <div onClick={() => setgroupUsers(groupUsers.filter(ele => ele._id !== element._id))} className='text-[red] cursor-pointer'>
          <IoMdClose />
        </div>
      </div>
    ))
  }
</div>
       {/* search list */}
       <div className='max-h-[60vh] overflow-auto mb-2.5'>
       {
          searchedUsers?.map(user => 
            (
              <>
                 <div onClick = {
                     e => {
                    setsearch("")
                    if(!groupUsers.some(ele => ele._id === user._id))
                        setgroupUsers(prev => [...prev, user])
                }} className='bg-[#37363C] text-white mt-1  p-2 flex items-center h-[10vh] rounded-xl cursor-pointer hover:bg-[#8B8B89] duration-200'>
        <img src = {user.imageURL} className='h-[80%] w-[10%] ml-2 object-cover bg-center bg-contain rounded-full'  />
        <div className='flex flex-col justify-start items-center ml-3'>
          <div>
          {user.username}
          </div>
          <div >
            {user.email}
          </div>
        </div>
       </div>
              </>
            ))
        }
        </div>
       <button  type="submit" class="py-3 place-self-center px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
  CREATE CHAT
</button>
        </form>
      </Modal>
    </div>
  );
}