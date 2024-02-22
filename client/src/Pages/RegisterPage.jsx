import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import {useNavigate} from "react-router-dom"
import axios from "axios"

const RegisterPage = ({ isLogin }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

   
    const navigate = useNavigate()
    const onSubmit = async(data)    => {
        const uploadData = {...data}
        delete uploadData.image
        try{
            console.log("herre")
        if(data.image.length){
            const formData  = new FormData()
            formData.append('file', data.image[0])
            formData.append('upload_preset', "chat-app")
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, formData)
            const imageURL= response.data.url
            uploadData.imageURL = imageURL
        }   


        let response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, uploadData)
        response = response.data
        if(response.success == false)throw new Error(response.message)
        const token = response.token
        localStorage.setItem("token", token)
        navigate('/home')
    }
    catch(err){
        console.log("error")
        console.log(err.message)
    }
    }
    return (

        <form action="#" class="signup" style={{ display: `${isLogin ? "none" : "block"}` }} onSubmit={handleSubmit(onSubmit)}>

            <div class="field">
                Username
                <input type="text" placeholder="Username"  {...register("username", { required: true, maxLength: 20, minLength: 5 })} />
            </div>


            <br />
            {errors.username?.type === "required" && (
                <p role="alert" style={{ color: "red" }}>First name is required</p>
            )}
            {errors.username?.type === "minLength" && (
                <p role="alert" style={{ color: "red" }}>Enter more characters</p>
            )}
            {errors.username?.type === "maxLength" && (
                <p role="alert" style={{ color: "red" }}>Character limit exceeded(5-20)</p>
            )}
            <div class="field">
                Email
                <input type="text" placeholder="Email Address"   {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i })} />
            </div>
            <br />

            {errors.email?.type === "required" && (
                <p role="alert" style={{ color: "red" }}>Email is required</p>
            )}

            {errors.email?.type === "pattern" && (
                <p role="alert" style={{ color: "red" }}>Enter valid email</p>
            )}
            <div class="field">
                Password
                <input type="password" placeholder="Password"  {...register("password", { required: true, minLength: 5, maxLength: 20 })} />
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
            <div class="field ">
                Upload image
                <input type="file" accept="image/png, image/jpeg" {...register("image")} onChange = {e=>console.log(e.target.files[0])} />
            </div>
            <br />
            <div class="field btn">
                <div class="btn-layer"></div>
                <input type="submit" value="Signup" />
            </div>
        </form>
    )
}

export default RegisterPage