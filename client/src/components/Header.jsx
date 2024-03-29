import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import searchLogo from '../assets/magnifierGlass.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const [searchGroup, setSearchGroup] = useState('');
    const navigate = useNavigate()
    async function handelSearchGroup()
    {
        const response = await fetch(`url`, )
    }
    const [name, setName]= useState('User');
    useEffect(()=>{
        axios.get("http://localhost:8000/user/details")
        .then((res)=>{
            setName(res.data.user.name);
        })
        .catch(err => console.log(err));
    },[])
    return (
        <nav className="flex items-center justify-between p-4 bg-gray-700 text-white">
            <div className="flex items-center">
                <img src={logo} alt="Bill Buddy" className="h-16 w-auto scale-150 mr-2" />
                <h3 className="text-lg">Hello {name}</h3>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={searchGroup}
                        onChange={(e) => setSearchGroup(e.target.value)}
                        className="border-2 border-gray-300 rounded-md px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 text-black"
                        placeholder="Search"
                    />
                    <button 
                    onClick={()=>handelSearchGroup()}
                    className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
                        <img src={searchLogo} alt="search" className="h-5 w-auto" />
                    </button>
                </div>
                <button 
                onClick={()=>navigate('/creategroup')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Group
                </button>
                <button 
                onClick={()=>navigate('/logout')}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Log out
                </button>
            </div>
        </nav>
    );
}

export default Header;
