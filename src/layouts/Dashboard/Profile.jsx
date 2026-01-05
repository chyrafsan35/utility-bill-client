import React, { use, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { BiUser, BiEnvelope, BiShieldAlt, BiCalendarAlt } from 'react-icons/bi';
import Swal from 'sweetalert2';

const Profile = () => {
    const { user, signOutUser } = use(AuthContext);
    const editProfileModal = useRef();
    const [userData, setUserData] = useState();

    useEffect(() => {
        fetch(`https://utility-api-server.vercel.app/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setUserData(data)
            })
    }, [user?.email])

    const handleEditProfile = () => {
        editProfileModal.current.showModal();
    }

    const handleSubmitModal = (e) => {
        e.preventDefault();
        const userImage = e.target.image?.value || userData.image;
        const userName = e.target.name?.value || userData.name;

        const updateProfile = {
            name: userName,
            image: userImage,
        }

        fetch(`https://utility-api-server.vercel.app/users/${user.email}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateProfile)
        })
            .then(res => res.json())
            .then(data => {
                setUserData(prev => ({
                    ...prev,
                    ...updateProfile
                }));
                console.log('Updated', data);
                Swal.fire({
                    title: "Profile updated",
                    icon: "success",
                    draggable: true
                });
                editProfileModal.current.close();
            })
    }

    const handleLogOut = () => {
        signOutUser();
    }

    return (
        <div className="p-2 md:p-4 min-h-screen">
            <div className="mb-8">
                <h1 className="text-xl font-semibold text-gray-800">My Profile</h1>
                <p className="text-gray-500 text-sm">Manage your personal information and account status</p>
            </div>

            <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <div className="relative">
                        <img
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-4 ring-emerald-50 p-1"
                            src={userData?.image || 'https://ibb.co.com/TqYhcmN8'}
                            alt="Profile"
                        />
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
                    </div>
                    <h2 className="mt-6 text-xl font-bold text-gray-800">{userData?.name}</h2>
                    <p className="text-emerald-600 text-sm font-medium bg-emerald-50 px-3 py-1 rounded-full mt-2">Verified Member</p>
                    <div className='flex flex-col items-center gap-3 pt-8'>
                        <button onClick={handleEditProfile} className='btn btn-primary text-white'>Update Profile</button>
                        <button onClick={handleLogOut} className='btn border-2 border-primary'>Log Out</button>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <BiUser className="text-emerald-500" /> General Information
                        </h3>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                                <div className="p-3 bg-gray-100 rounded-xl text-gray-500">
                                    <BiUser size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Full Name</p>
                                    <p className="text-gray-700 font-medium text-sm">{user?.displayName}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
                                <div className="p-3 bg-gray-100 rounded-xl text-gray-500">
                                    <BiEnvelope size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email Address</p>
                                    <p className="text-gray-700 font-medium text-sm">{user?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <BiShieldAlt className="text-emerald-500" /> Account Status
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
                                <div>
                                    <p className="text-xs text-emerald-600 font-bold uppercase">Status</p>
                                    <p className="text-emerald-800 font-semibold text-sm">Active User</p>
                                </div>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-3">
                                <BiCalendarAlt className="text-blue-500" size={24} />
                                <div>
                                    <p className="text-xs text-blue-600 font-bold uppercase">Member Since</p>
                                    <p className="text-blue-800 font-semibold text-sm">Jan 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <dialog ref={editProfileModal} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-5xl p-0">
                    <div className="px-6 py-4 border-b bg-base-100 sticky top-0 z-10">
                        <h2 className="text-2xl font-bold text-primary">
                            Edit Profile
                        </h2>
                        <p className="text-sm text-gray-500">
                            Update profile information carefully
                        </p>
                    </div>

                    <form onSubmit={handleSubmitModal} className='p-6 space-y-6'>
                        <div>
                            <div className="bg-base-200 rounded-xl p-4 shadow-sm">
                                <img
                                    src={
                                        userData?.image ||
                                        'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png'
                                    }
                                    alt="product" className="rounded-lg mb-4 object-contain max-h-48 w-full bg-white"
                                />

                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Profile Image
                                    </span>
                                </label>

                                <input
                                    type="text"
                                    name="image"
                                    defaultValue={userData?.image}
                                    className="input input-bordered w-full"
                                />

                                <p className="text-xs text-gray-500 mt-2">
                                    Leave empty to keep existing image
                                </p>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">
                                        Username
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={userData?.name}
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t">
                            <button type="button" onClick={() => editProfileModal.current.close()} className="btn text-primary border-2 border-primary">
                                Cancel
                            </button>

                            <button type="submit" className="btn btn-primary text-white  px-8">
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default Profile;