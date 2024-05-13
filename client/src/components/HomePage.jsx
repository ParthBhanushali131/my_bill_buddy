import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo2.png'

function HomePage() {
  return (
    <div className='flex w-full justify-around items-center h-[100vh] bg-gradient-to-r from-gray-600 to-gray-800'>
      <div>
        <Link to="/login">
          <button className='border-2 p-4 bg-cyan-400 hover:bg-cyan-500 hover:text-white text-black rounded-xl border-none'>Get started</button>
        </Link>
      </div>
      <div className=''>
        <img src={logo} alt="logo" className='w-[400px]'/>
        {/* <h2>Bill Buddy</h2> */}
        <h3 className='text-white text-2xl w-[400px] font-bold'>Make bill spliting among friends, colegues, and family super easy.</h3>
      </div>
    </div>
  )
}

export default HomePage
