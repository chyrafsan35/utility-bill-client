import React from 'react';
import logo from '../../assets/utility_logo.png';
import { FaFacebookF } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-white text-black p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <img className='w-[50px]' src={logo} alt="" />
                        <p className='font-bold text-xl text-[#F50000]'>Utility Bill</p>
                    </div>
                    <p className='font-semibold'>Providing reliable tech since 2005</p>
                </div>

                <div>
                    <h6 className="footer-title text-[#F50000] mb-2">Social</h6>
                    <div className="flex gap-4">
                        <a className='text-[#F50000]'><FaYoutube /></a>
                        <a className='text-[#F50000]'><FaSquareXTwitter /></a>
                        <a className='text-[#F50000]'><FaFacebookF /></a>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <p>Copyright © {new Date().getFullYear()} - All rights reserved by Utility Bill</p>
            </div>
        </footer>
    );
};

export default Footer;