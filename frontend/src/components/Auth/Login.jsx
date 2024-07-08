import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
    const [email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate()

const handleSubmit = (e)=>{
  e.preventDefault()
  if(email === 'admin@gmail.com' && password === '12345678')
  {
    navigate('/admin/dashboard')
    toast.success('Admin successfully login')
  }
  else
  {    
    toast.error('Invalid credentials')
  }
}  


  return (
      <div className='h-screen  flex  justify-center items-center bg-black bg-opacity-80 '>
    <div className='border-2 w-[70%] md:w-1/3 lg:w-1/4 h-[50%] flex flex-col gap-5 bg-white rounded-xl'>
        <h2 className='text-center p-5 text-xl font-bold'>Login Form</h2>
        <form onSubmit={handleSubmit} className='flex flex-col mx-5 gap-8 pb-5'>
          <input type="email" placeholder='Enter Your Email' className='border-2 border-black rounded-md p-2 ' value={email}
          onChange={(e)=>setEmail(e.target.value)} required/>
          <input type="password" placeholder='Enter Your Password' className='border-2 border-black rounded-md p-2'  value={password}
          onChange={(e)=>setPassword(e.target.value)} required />
          <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login