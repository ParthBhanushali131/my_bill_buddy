import React from 'react'
import { useNavigate } from 'react-router-dom'
function LogOut() {
    const navigate = useNavigate()
    return (
        <div className='h-screen w-full flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-800'>
            <div className='p-5 flex flex-col gap-8 w-[600px] h-[400px] justify-center items-center bg-gray-800 border-2 rounded-xl shadow-lg border-none outline-none shadow-gray-500 m-auto'>

                <div className='text-white text-3xl'>
                    Do you sure want to Log Out?
                </div>
                <div>
                    <button 
                    className='m-4 w-[100px] bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700'
                    onClick={() => navigate('/')}>Yes</button>
                    <button 
                    className='m-4 w-[100px] bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700'
                    onClick={() => navigate('/groups')}>No</button>
                </div>
            </div>
        </div>
    )
}

export default LogOut
