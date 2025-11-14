import React from 'react';
import { Link } from 'react-router';
import tree from '../../assets/tree-branch.png';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#C8FAA7] to-[#3A8C08] text-gray-900 relative overflow-hidden">
            <img className='max-w-[300px] md:max-w-[500px] absolute right-0 top-[-150px]' src={tree} alt="" />
            <h1 className="text-6xl md:text-8xl font-extrabold mb-4">404</h1>
            <h2 className="text-2xl md:text-4xl font-semibold mb-6">Oops! Page not found</h2>
            <p className="text-center text-gray-800 mb-8 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="px-6 py-3 btn btn-outline btn-success text-white rounded-lg shadow  transition">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;