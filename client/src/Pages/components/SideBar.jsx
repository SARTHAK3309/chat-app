import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import _ from "lodash"
import axios from 'axios';
import SearchCard from './SearchCard';


const SideBar = ({ sidebar, setsidebar, searchedUsers, setsearchedUsers }) => {
  const [search, setsearch] = useState('')
  const headerOptions = {
    headers:{
      'Authorisation' : `Bearer ${localStorage.getItem('token')}`
    }
  }
  const handleSearch = async(e)=>{
    try{
      setsearch(e.target.value)
      let response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/search?search=${e.target.value}`, headerOptions)
      response = response.data
      if(response.success == false)throw new Error(response.message)
      console.log(response.users)
      setsearchedUsers(prev=>response.users)
    }
    catch(e){
      console.log(e.message)
    }
    }
  return (
    <div className='sidebar h-[100vh] bg-[grey] p-2 z-[2] w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[30vw] xl:w[25vw] fixed transiton-all duration-500' style={{ left: `${sidebar ? "0%" : "-100%"}` }}>
      <div className='flex justify-start items-center gap-3'>
        <IoClose className='text-white text-5xl cursor-pointer' onClick={() => { setsidebar(!sidebar) }} />
        <div className='text-2xl'>Search Users</div>
      </div>

      <form className='relative' onSubmit={e=>{e.preventDefault()}}>
      <input placeholder="Search User" type="text" onChange = {e => handleSearch(e)} className='w-[100%]  mt-3 text-center border-solid border-2 border-black  rounded-xl p-1' />
      {/* <FaMagnifyingGlass   className='absolute left-2 top-5 cursor-pointer'/> */}
      </form>

      <div className='h-[80vh] my-auto mt-3 overflow-auto text-white'>
        {
          searchedUsers?.map(user => 
            (
              <>
              <SearchCard imageURL = {user.imageURL} username = {user.username} email = {user.email}/>
              </>
            ))
        }
      </div>
    </div>
  )
}

export default SideBar