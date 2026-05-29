import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'
const ErrorPage = ({message}) => {
    const navigator = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-background p-6'>
       <FaExclamationTriangle className='text-6xl text-red-500 mb-4' />
        <h1
            className='text-3xl font-bold mb-2 text-card-title'
            >Oops! Something went wrong.</h1>
        <p className='text-para-color mb-6 text-center'>
            {message? message : "An unexpected error has occured"}
        </p>
        <button
            onClick={()=>navigator("/")}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition'
        >
            Go back to home 
        </button>
    </div>
  )
}

export default ErrorPage