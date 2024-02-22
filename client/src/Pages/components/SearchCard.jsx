import React from 'react'

const SearchCard = ({username, email, imageURL}) => {
  return (
    <div className='bg-[#37363C] mt-3 mx-3 flex items-center h-[10%] rounded-xl cursor-pointer hover:bg-[#8B8B89] duration-200'>
        <img src = {imageURL} className='h-[80%] w-[10%] ml-2 object-cover bg-center bg-contain rounded-full'  />
        <div className='flex flex-col justify-start items-center ml-3'>
          <div>
          {username}
          </div>
          <div >
            {email}
          </div>
        </div>
       </div>
  )
}

export default SearchCard