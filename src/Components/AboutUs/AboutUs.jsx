import React from 'react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineClock, HiOutlineDocumentSearch } from "react-icons/hi";
import { NavLink } from 'react-router';

const AboutUs = () => {
    return (
        <div className='min-h-screen bg-white'>
            <div className='bg-[#F0FDF4] py-20 px-5'> 
                <div className='max-w-4xl mx-auto text-center'>
                    <h1 className='text-2xl md:text-3xl font-black text-gray-900 mb-6 tracking-tight'>Simplifying Utility Management</h1>
                    <p className='text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto'>
                        Managing electricity, gas, water, and internet bills shouldn't be a chore.
                        We built a secure, centralized platform to give you back your time and peace of mind.
                    </p>
                </div>
            </div>

            <div className='max-w-[1200px] mx-auto px-5 py-20 space-y-24'>

                <div className='grid md:grid-cols-2 gap-12 items-center'>
                    <div className='space-y-6'>
                        <h2 className='text-xl font-bold text-gray-900'>Who We Are & Our Mission</h2>
                        <p className='text-gray-600 leading-relaxed'>
                            We are a digital utility bill management platform designed to make everyday bill payments simple, fast, and stress-free. Our goal is to help users manage all household expenses in one secure place.
                        </p>
                        <div className='space-y-3'>
                            {['Reduce late payment fees', 'Improve financial awareness', 'Total control over expenses'].map((item) => (
                                <div key={item} className='flex items-center gap-2 text-gray-700 font-medium'>
                                    <IoMdCheckmarkCircleOutline className="text-primary text-xl" /> {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='bg-primary/5 rounded-3xl p-10 flex items-center justify-center border border-primary/10 shadow-sm'>
                        <div className='text-center space-y-2'>
                            <p className='text-5xl font-black text-primary'>100%</p>
                            <p className='text-sm font-bold text-primary/70 uppercase tracking-widest'>Secure & Transparent</p>
                        </div>
                    </div>
                </div>

                <div className='space-y-12'>
                    <div className='text-center'>
                        <h2 className='text-xl font-bold'>What We Offer</h2>
                        <p className='text-gray-500 mt-2'>Explore how we simplify your daily life</p>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {[
                            { title: 'Unified Dashboard', icon: <HiOutlineLightningBolt />, desc: 'Manage all bills from a single view' },
                            { title: 'Payment Tracking', icon: <HiOutlineClock />, desc: 'Keep track of history and due dates' },
                            { title: 'Secure Payments', icon: <HiOutlineShieldCheck />, desc: 'Pay with bank-grade security' },
                            { title: 'Detailed Records', icon: <HiOutlineDocumentSearch />, desc: 'Access clear bill details anytime' },
                        ].map((feature, i) => (
                            <div key={i} className='p-8 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all group'>
                                <div className='w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-primary group-hover:text-white transition-colors'>
                                    {feature.icon}
                                </div>
                                <h3 className='font-bold text-gray-900 mb-2'>{feature.title}</h3>
                                <p className='text-sm text-gray-500 leading-relaxed'>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='bg-gray-900 rounded-[2.5rem] p-10 md:p-20 text-center text-white relative overflow-hidden'>
                    <div className='relative z-10'>
                        <h2 className='text-2xl font-bold mb-4'>Ready to take control of your bills?</h2>
                        <p className='text-gray-400 mb-10 max-w-lg mx-auto'>Have questions or suggestions? We are always here to listen and improve our platform for you.</p>
                        <div className='flex flex-wrap justify-center gap-4'>
                            <NavLink to='/contact' className='bg-primary hover:bg-primary/80 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/20'>
                                Contact Us
                            </NavLink>
                            <NavLink to='/feedback' className='bg-white/10 hover:bg-white/20 border border-white/20 px-10 py-4 rounded-xl font-bold transition-all'>
                                Send Feedback
                            </NavLink>
                        </div>
                    </div>
                    <div className='absolute -bottom-24 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl'></div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;