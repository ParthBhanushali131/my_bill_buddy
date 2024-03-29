import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateGroupForm() {
 const [groupName, setGroupName] = useState('');
 const [members, setMembers] = useState([]);
 const [newMember, setNewMember] = useState('');
 const [error, setError] = useState('');

 const navigate = useNavigate()

 const handleAddMember = () => {
    if (newMember.trim() === '') {
      setError('Member name cannot be empty.');
      return;
    }
    setMembers([...members, newMember]);
    setNewMember('');
    setError('');
 };

 const handleRemoveMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
 };

 const handleSubmit = async(e) => {
    e.preventDefault();
    if (groupName.trim() === '' || members.length === 0) {
      setError('Group name and at least two member are required.');
      return;
    }
    // Here you would typically send the group name and members to your backend for group creation
    // console.log('Group Name:', groupName, 'Members:', members);
    await axios.post('http://localhost:8000/user/newgroup', {groupName, members})
    .then((res)=>{
      console.log('new group created successfully', res.data)
      navigate('/groups')
    })
    .catch((error)=>{
      console.log("Error creating group :- ", error)
      setError("An error occured while creating new group")
    })
    setError('');
 };

 return (
    <form onSubmit={handleSubmit} className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-800">
      <div className='p-5 flex flex-col gap-8 w-[600px] h-auto justify-self-start items-center bg-gray-800 border-2 rounded-xl shadow-lg border-none outline-none shadow-gray-500 m-auto'>
        <h2 className='text-white text-2xl mb-4'>Create a new Group</h2>
        <div className="flex items-center">
          <label htmlFor="groupName" className="text-sm font-medium text-white mr-4">Group Name:</label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
            className="block w-[400px] h-[2rem] rounded-md border-gray-700 bg-slate-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-4"
            placeholder='Enter group name'
          />
        </div>
        <div className="self-start flex items-center ml-12">
          <label htmlFor="members" className="text-sm font-medium text-white mr-4">Members:</label>
          <div className="flex flex-col">
            <input
              type="text"
              id="members"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              className="block w-[200px] h-[2rem] rounded-md border-gray-700 bg-slate-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-4 mb-2"
              placeholder='Add member'
            />
            <button onClick={handleAddMember} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">+</button>
          </div>
          <div className="flex flex-col ml-4">
            {members.map((member, index) => (
              <div key={index} className="flex h-full items-center">
                <span className="text-white text-2xl">{member}</span>
                <button onClick={() => handleRemoveMember(index)} className=" text-black font-bold rounded-full ml-2 mb-4 text-2xl">⛔</button>
              </div>
            ))}
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="mt-4 w-[150px] bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700">Confirm Creation</button>
        <h3 className='text-white'>Already have a group? <Link to='/groups' className='text-white underline'>View Groups</Link></h3>
      </div>
    </form>
 );
}

export default CreateGroupForm;
