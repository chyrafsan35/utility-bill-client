import React, { use, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import logo from '../../assets/utility_logo.png'

const NavBar = () => {
    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/bills'}>Bills</NavLink></li>
    </>

    const { user, signOutUser } = use(AuthContext);
    const [userData, setUserData] = useState();

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeToggle = (e) => {
        setTheme(e.target.checked ? "swap" : "light");
    };

    console.log('Here is the current user', user)
    const context = useContext(AuthContext);
    console.log("Full context from NavBar:", context);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`https://utility-api-server.vercel.app/users/${user.email}`)
            .then(res => res.json())
            .then(data => setUserData(data))
    }, [user?.email])

    const handleSignOut = () => {
        signOutUser()
            .then(() => { })
            .catch(() => { });
    }

    const conditionalLinks = <>
        {
            user ?
                <>
                    <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
                    <li><NavLink to={'/feedback'}>Feedback</NavLink></li>
                    <li><NavLink to={'/contact'}>Contact</NavLink></li>
                    <li><button onClick={handleSignOut} className='btn px-4 py-2 rounded-sm bg-primary text-white text-sm font-medium hover:bg-primary/70 transition'>Logout</button></li>
                </>
                :
                <>
                    <li><NavLink to={'/about-us'}>About Us</NavLink></li>
                    <li><NavLink to={'/contact'}>Contact</NavLink></li>
                    <li><NavLink to={'/help'}>Help</NavLink></li>
                    <li><NavLink to={'/login'}>Login</NavLink></li>
                    <li><NavLink to={'/register'}>Register</NavLink></li>
                </>
        }
    </>

    return (
        <div className="navbar max-w-[1440px] mx-auto border-x-0 bg-base-100 z-50 relative">
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
                <a className="btn btn-ghost text-xl hidden md:block">Utility Bill</a><img className='max-w-10' src={logo} alt="" />
            </div>
            <div className="navbar-center hidden lg:flex justify-center">
                <ul className="menu menu-horizontal px-1">
                    {links} {conditionalLinks}
                </ul>

            </div>
            <div className="navbar-end gap-3">
                <input
                    type="checkbox"
                    className="toggle theme-controller"
                    checked={theme === "swap"}
                    onClick={handleThemeToggle}
                />
                {
                    user && (
                        <img
                            className="w-10 h-10 mr-3 rounded-full object-cover border"
                            src={userData?.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                            alt="User Avatar"
                        />
                    )
                }

            </div>
        </div>
    );
};

export default NavBar;