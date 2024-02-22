import React from 'react'
import { useForm } from "react-hook-form" 
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LoginPage = ({isLogin}) => {
    const notify = (message) => toast(message);
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = async(data) => {
        try
        {
            console.log("clicked")
        let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, data)
        response = response.data
        if(response.success == false)
        throw new Error(response.message)
        const token = response.token
        localStorage.setItem('token', token)
        navigate('/home')
        }
        catch(e){
            notify(e.message)
        }
    }

  return (
    <form action="#" class="login" style={{display : `${isLogin?"block":"none"}`}} onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer />
             <div class="field">
                Email
                <input type="text" placeholder="Email Address"  {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i })}/>
             </div>
             <br />
             {errors.email?.type === "required" && (
                <p role="alert" style={{ color: "red" }}>Email is required</p>
            )}

            {errors.email?.type === "pattern" && (
                <p role="alert" style={{ color: "red" }}>Enter valid email</p>
            )}
             <div class="field" >
                Password
                <input type="password" placeholder="Password" {...register("password", { required: true, minLength: 5, maxLength: 20 })} />
             </div>
             <br />
             {errors.password?.type === "required" && (
                <p role="alert" style={{ color: "red" }}>Password is required</p>
            )} 
            {errors.password?.type === "minLength" && (
                <p role="alert" style={{ color: "red" }}>Enter more characters</p>
            )}
            {errors.password?.type === "maxLength" && (
                <p role="alert" style={{ color: "red" }}>Character limit exceeded(5-20)</p>
            )}
             <div class="pass-link">
                <a href="#">Forgot password?</a>
             </div>
             <div class="field btn">
                <div class="btn-layer"></div>
                <input type="submit" value="Login"/>
             </div>
             
          </form>
  )
}

export default LoginPage