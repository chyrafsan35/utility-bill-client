import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-gray-900 ">
            <h1 className="text-6xl md:text-8xl font-extrabold mb-4">404</h1>
            <h2 className="text-2xl md:text-4xl font-semibold mb-6">Oops! Page not found</h2>
            <p className="text-center text-gray-800 mb-8 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="px-6 py-3 btn border-none text-white btn btn-primary hover:bg-primary/80 rounded-sm shadow  transition">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;