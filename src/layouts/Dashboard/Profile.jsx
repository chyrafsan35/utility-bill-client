import React, { use } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const Profile = () => {
    const { user } = use(AuthContext)
    return (
        <div>
            <div className='flex flex-col items-center'>
                <div className='mb-8 text-center'>
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>
                </div>
                <img className='max-w-50 ring-0 rounded-full' src={user.photoURL} alt="" />
            </div>
            <div>
                <p>User Status</p>
            </div>
        </div>
    );
};

export default Profile;