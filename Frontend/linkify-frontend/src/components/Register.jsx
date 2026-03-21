import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import {useForm} from 'react-hook-form'
import TextField from './TextField'
import toast, { Toaster } from 'react-hot-toast';
import api from '../api/api';
const Register = () => {
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors}
        } = useForm({
          defaultValues:{
            username: "",
            email: "",
            password: ""
          },
          mode:'onTouched'

        });
    const registerHandler = async (data) => {
        setLoader(true);
        try {
          const {data: response} = await api.post(
            "/api/auth/public/register",
            data
          );
          reset();
          navigate("/login");
          toast.success("Registration Successfull")
        } catch (error) {
          console.log(error)
          toast.error("Registration Failed!")
        } finally{
          setLoader(false)
        }
    }    
    
  return (
    <div
className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
        <form onSubmit={handleSubmit(registerHandler)}
        className='sm:sm:w-112.5 w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md'>
          <h1
          className='text-center font-serif text-btn font-bold lg:text-3xl text-2xl'>
            Register Here
          </h1>
          <hr className='mt-2 mb-5 text-black'/>
          <div className='flex flex-col gap-3'>
             <TextField 
                label="Username: "
                required
                id="username"
                type="text"
                message="Username is required"
                placeholder="Enter your name"
                register={register}
                errors={errors}
             />
             <TextField 
                label="Email: "
                required
                id="email"
                type="email"
                message="Email is required"
                placeholder="Enter your email"
                register={register}
                errors={errors}
             />
             <TextField 
                label="Password: "
                required
                id="password"
                type="password"
                message="Password is required"
                placeholder="Create password"
                register={register}
                min={6}
                errors={errors}
             />
             </div>
             <button 
                disabled={loader}
                type='submit'
                className='bg-customRed font-semibold text-white bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3'
             >
              {loader ? "Loading...": "Register"}
             </button>
             <p className='text-center text-sm text-slate-700 mt-6'>
              Already have an account?
              <Link to="/login"
                className='font-semibold underline hover:text-black'
              >
              <span className='text-btn'>
                Login
              </span>
              </Link>
             </p>

        </form>
        </div>
  )
}

export default Register