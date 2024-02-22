import React, { useState,useRef, useEffect } from 'react'
import "./AuthPage.css"
import LoginPage from './LoginPage'
import SigninPage from './RegisterPage'
import RegisterPage from './RegisterPage'
const AuthPage = () => {
    const [isLogin, setisLogin]  = useState(true)
    const inputRef = useRef(null)
    const handleChangeAuthPage = (e)=>{
      const id = e.target.id
      if(isLogin && id === "signup")setisLogin(!isLogin)
      if(!isLogin && id === "login")setisLogin(!isLogin)    
    
    
    
    }


    // useEffect(()=>{
      
    // }, [])
  return (
   <div className='body color'>
    <div class="wrapper">
    <div class="title-text">
       <div class="title login">
          {isLogin ? <>Login Form</> : <>Signup Form</>}
       </div>
       <div class="title signup">
       {isLogin ? <>Login Form</> : <>Signup Form</>}
       </div>
    </div>
    <div class="form-container" >
       <div class="slide-controls"  onClick = {e=>handleChangeAuthPage(e)}>
          <input type="radio" ref = {inputRef} name="slide" id="login" checked />
          <input type="radio" name="slide" id="signup" />
          <label for="login" class="slide login">Login</label>
          <label for="signup" class="slide signup">Signup</label>
          <div class="slider-tab"></div>
       </div>
       <div class="form-inner" >
          {/* <form action="#" class="login" style={{display : `${isLogin?"block":"none"}`}}>
             <div class="field">
                <input type="text" placeholder="Email Address" required/>
             </div>
             <div class="field">
                <input type="password" placeholder="Password" required/>
             </div>
             <div class="pass-link">
                <a href="#">Forgot password?</a>
             </div>
             <div class="field btn">
                <div class="btn-layer"></div>
                <input type="submit" value="Login"/>
             </div>
             
          </form>
          <form action="#" class="signup" style={{display : `${isLogin?"none":"block"}`}}>
           <div class="field mb-3">
            Username
                <input type="text" placeholder="Username" required/>
             </div>

             <br />
             <div class="field">
              Email
                <input type="text" placeholder="Email Address" required/>
             </div>
             <br />
             <div class="field">
              Password
                <input type="password" placeholder="Password" required/>
             </div>
             
             <br />
             <div class="field ">
              Upload image
                <input type="file" accept="image/png, image/jpeg" />
             </div>
             <br />
             <div class="field btn">
                <div class="btn-layer"></div>
                <input type="submit" value="Signup"/>
             </div>
          </form> */}
          <LoginPage isLogin={isLogin} />
          <RegisterPage isLogin={isLogin} />

       </div>
    </div>
 </div>
 </div>
  )
}

export default AuthPage