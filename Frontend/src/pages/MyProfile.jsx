import React, { useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Tenzi sherpa",
    image: assets.profile_pic,
    email: "hello@test1.com",
    phone: "+124367899",
    address: {
      line1: "ktm 1",
      line2: "Address 3",
    },
    gender: "male",
    dob: "2001-03-10",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='max-w-2xl w-full flex flex-col gap-4 p-6 bg-white shadow-md rounded-md text-sm'>
        <img className='w-36 h-36 rounded-full mx-auto' src={userData.image} alt="User profile" />

        {isEdit ? (
          <input
            className='bg-gray-200 text-2xl font-medium max-w-xs mt-4 p-2 rounded'
            type='text'
            value={userData.name}
            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className='font-medium text-3xl text-neutral-800 mt-4 text-center'>{userData.name}</p>
        )}

        <hr className='bg-zinc-500 h-[1px] border-none my-3' />

        <p className='text-neutral-500 underline mt-3'>Contact Info</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p>Email:</p>
          <p>{userData.email}</p>

          <p>Phone:</p>
          {isEdit ? (
            <input
              className='bg-gray-200 p-1 rounded'
              type='text'
              value={userData.phone}
              onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p>{userData.phone}</p>
          )}

          <p>Address:</p>
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <p>Line 1:</p>
              {isEdit ? (
                <input
                  className='bg-gray-200 p-1 ml-2 rounded'
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))}
                />
              ) : (
                <p className='ml-2'>{userData.address.line1}</p>
              )}
            </div>
            <div className='flex items-center mt-1'>
              <p>Line 2:</p>
              {isEdit ? (
                <input
                  className='bg-gray-200 p-1 ml-2 rounded'
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))}
                />
              ) : (
                <p className='ml-2'>{userData.address.line2}</p>
              )}
            </div>
          </div>
        </div>

        <p className='text-neutral-500 underline mt-4'>Basic Information</p>
        <div className='mt-3'>
          <div className='flex items-center'>
            <p>Gender:</p>
            {isEdit ? (
              <select
                className='bg-gray-200 p-1 ml-2 rounded'
                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className='ml-2'>{userData.gender}</p>
            )}
          </div>
          <div className='flex items-center mt-2'>
            <p>Birth Date:</p>
            {isEdit ? (
              <input
                className='bg-gray-200 p-1 ml-2 rounded'
                type='date'
                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                value={userData.dob}
              />
            ) : (
              <p className='ml-2'>{userData.dob}</p>
            )}
          </div>
        </div>

        <div className='mt-10 text-center'>
          {isEdit ? (
            <button className='bg-blue-500 text-white p-2 rounded' onClick={() => setIsEdit(false)}>
              Save Information
            </button>
          ) : (
            <button className='bg-green-500 text-white p-2 rounded' onClick={() => setIsEdit(true)}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
