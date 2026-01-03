import React, { use } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const Profile = () => {
    const { user } = use(AuthContext)
    return (
        <div className='p-4'>
            <div className='flex flex-col md:flex-row gap-4 items-center'>
                <img className='max-w-40 ring-0 rounded-full' src={user.photoURL} alt="" />
                <div className='mb-8'>
                    <p className='text-lg font-semibold'>{user.displayName}</p>
                    <p className='text-sm text-gray-400'>{user.email}</p>
                </div>
            </div>
            <div className='pt-15'>
                <p>User Status</p>
            </div>
        </div>
    );
};

export default Profile;