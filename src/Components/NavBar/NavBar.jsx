import React, { use, useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const NavBar = () => {
    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/bills'}>Bills</NavLink></li>
    </>

    const { user, signOutUser } = use(AuthContext);
    console.log('Here is the current user', user)
    const context = useContext(AuthContext);
    console.log("Full context from NavBar:", context);

    const handleSignOut = () => {
        signOutUser()
            .then(() => { })
            .catch(() => { });
    }

    const conditionalLinks = <>
        {
            user ? <><li><NavLink to={'/myPayBills'}>My Pay Bills</NavLink></li>
                <li><img className='max-w-10 max-h-10 mr-3 rounded-full' src={`${user.photoURL}`} alt="" /></li>
                <li><button onClick={handleSignOut} className='btn border-none'>Logout</button></li>
                </> 
                :
                <> <li><NavLink to={'/login'}>Login</NavLink></li> <li><NavLink to={'/register'}>Register</NavLink></li></>
        }
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links} {conditionalLinks}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Utility Bill</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links} {conditionalLinks}
                </ul>

            </div>
            <div className="navbar-end">

            </div>
        </div>
    );
};

export default NavBar;