import React from 'react';
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className='bg-[#FFFEED]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>

            <ToastContainer></ToastContainer>
        </div>
    )
};

export default Root;