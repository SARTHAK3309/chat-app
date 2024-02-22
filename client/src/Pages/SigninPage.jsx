import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SigninPage = ({isLogin}) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const notify = (err)=>toast(err)

    useEffect(()=>{
        console.log(errors)
       if(errors.username)
       notify(errors.username)
    }, [errors])
    
      const onSubmit = (data) => console.log("yeh", data)
  return (
    
    <form action="#" class="signup" style={{display : `${isLogin?"none":"block"}`}} onSubmit={handleSubmit(onSubmit)}>
                <ToastContainer />

           <div class="field">
            Username
                <input type="text" placeholder="Username"  {...register("username", { required: true, maxLength: 20, minLength: 5 })}/>
             </div>

                    
             <br />
                    {errors.username?.type === "required" && (
                <p role="alert" style = {{color : "red"}}>First name is required</p>
            )}
             {errors.username?.type === "minLength" && (
                <p role="alert" style = {{color : "red"}}>Enter more characters</p>
            )}
             {errors.username?.type === "maxLength" && (
                <p role="alert" style = {{color : "red"}}>Character limit exceeded(5-20)</p>
            )}
             <div class="field">
              Email
              <input type="text" placeholder="Email Address"   {...register("email", { required: true, pattern : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i })}/>
             </div>
             <br />

             {errors.email?.type === "required" && (
                <p role="alert" style = {{color : "red"}}>Email is required</p>
            )}

            {errors.email?.type === "pattern" && (
                <p role="alert" style = {{color : "red"}}>Enter valid email</p>
            )}
             <div class="field">
              Password
              <input type="password" placeholder="Password"  {...register("password", { required: true , minLength : 5, maxLength : 20})} />
             </div>
             
             <br />
             {errors.password?.type === "required" && (
                <p role="alert" style = {{color : "red"}}>Password is required</p>
            )}
             {errors.password?.type === "minLength" && (
                <p role="alert" style = {{color : "red"}}>Enter more characters</p>
            )}
             {errors.password?.type === "maxLength" && (
                <p role="alert" style = {{color : "red"}}>Character limit exceeded(5-20)</p>
            )}
             <div class="field ">
              Upload image
                <input type="file" accept="image/png, image/jpeg" {...register("image")}/>
             </div>
             <br />
             <div class="field btn">
                <div class="btn-layer"></div>
                <input type="submit" value="Signup" />
             </div>
          </form>
  )
}

export default SigninPage