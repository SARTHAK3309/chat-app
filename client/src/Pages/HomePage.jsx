import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import SideBar from './components/SideBar';
import Header from './components/Header';

const HomePage = () => {
  const [sidebar, setsidebar] = useState(false)
  const [searchedUsers, setsearchedUsers] = useState([])
  return (
    <div className='min-h-[100vh] min-w-[100vw] color'>



      <SideBar sidebar={sidebar} setsidebar={setsidebar} searchedUsers={searchedUsers} setsearchedUsers={setsearchedUsers}/>
      <Header sidebar={sidebar} setsidebar={setsidebar} />

      <div className='p-2 h-[92vh] gap-2 flex  items-center'>
      <div className='w-[100%] sm:w-[30%] block bg-white h-[100%] rounded-md p-2'>
d
      </div>
      <div className='w-[100%] sm:w-[70%] hidden sm:block bg-white h-full rounded-md p-2'>
    d
      </div>
      </div>
    </div>
  )
}

export default HomePage