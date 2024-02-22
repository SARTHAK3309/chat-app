import React from 'react'
import { useForm } from "react-hook-form"

const LoginPage = ({isLogin}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => console.log("yeh", data)

  return (
    <form action="#" class="login" style={{display : `${isLogin?"block":"none"}`}} onSubmit={handleSubmit(onSubmit)}>
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
             <div class="field" {...register("password", { required: true, minLength: 5, maxLength: 20 })}>
                Password
                <input type="password" placeholder="Password" />
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