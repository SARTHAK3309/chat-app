
import React, { useEffect, useState } from "react";
import axios from "axios"
import { Route, useNavigate } from "react-router-dom";
import AuthPage from "./AuthPage";
const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [user, setUser] = useState()
    useEffect(()=>{
        (
          async function(){
              try{
              const headerOptions = {
                headers:{
                  'Authorisation' : `Bearer ${localStorage.getItem('token')}`
                }
              }
              //changed here
              const url = `${import.meta.env.VITE_BACKEND_URL}/api/user/`
              const {data} = await axios.get(url, headerOptions)
              // user = data.user
              // setUser(data.user)
              localStorage.setItem('user', JSON.stringify(data.user))
              if(data.success == false)throw new Error(data.message)
              setIsLoggedIn(true)
              }
  
              catch(err){
                  navigate('/')
              }
          }
        )()
      }, [])
  
    return (
        <React.Fragment>
            {
                isLoggedIn ?  props.children : <AuthPage />
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;
