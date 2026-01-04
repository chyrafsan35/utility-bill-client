import React, { use } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { BiUser, BiEnvelope, BiShieldAlt, BiCalendarAlt } from 'react-icons/bi';

const Profile = () => {
    const { user } = use(AuthContext);

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
                            src={user?.photoURL || 'https://ibb.co.com/TqYhcmN8'}
                            alt="Profile"
                        />
                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full"></div>
                    </div>
                    <h2 className="mt-6 text-xl font-bold text-gray-800">{user?.displayName}</h2>
                    <p className="text-emerald-600 text-sm font-medium bg-emerald-50 px-3 py-1 rounded-full mt-2">Verified Member</p>
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
        </div>
    );
};

export default Profile;