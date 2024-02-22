
import React, { useEffect, useState } from "react";
import axios from "axios"
import { Route, useNavigate } from "react-router-dom";
import AuthPage from "./AuthPage";
const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(()=>{
        (
          async function(){
              try{
              console.log("you called me")
              const url = `${import.meta.env.VITE_BACKEND_URL}/`
              const {data} = await axios.get(url, {
                headers:{
                  'Authorisation' : `Bearer ${localStorage.getItem('token')}`
                }
              })
              console.log("d", data)
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
                isLoggedIn ? props.children : <AuthPage />
                // props.children
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;
