import React from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { AuthContext } from '../../Context/AuthContext';

const Contact = () => {

    const handleIssueSubmit = (e) => {
        e.preventDefault();
        const issuesData = {
            name: e.target.name.value,
            email: e.target.email.value,
            issue: e.target.issue.value,
        }

        fetch('https://utility-api-server.vercel.app/issues', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(issuesData)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Issues data', data)
            })
        e.target.reset();
    }

    return (
        <div className='min-h-screen  py-15 px-5'>
            <div className='max-w-[1200px] mx-auto'>

                <div className='text-center mb-16'>
                    <h2 className='text-2xl font-black text-gray-900 mb-4'>Get In Touch</h2>
                    <p className='text-gray-500 max-w-xl mx-auto text-sm'>
                        Have a question about your bills or our platform? Our team is here to help you 24/7.
                    </p>
                </div>

                <div className='flex flex-col lg:flex-row gap-12 items-start justify-center'>

                    <div className='w-full lg:w-1/3 space-y-6'>
                        <h3 className='text-xl font-semibold text-gray-900 mb-6'>Contact Information</h3>

                        <div className='flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-100'>
                            <div className='w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl'>
                                <FaPhoneAlt />
                            </div>
                            <div>
                                <p className='text-xs font-semibold text-gray-400 uppercase'>Call Us</p>
                                <p className='text-gray-900 text-sm'>+352 88536798</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-100'>
                            <div className='w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl'>
                                <CiMail />
                            </div>
                            <div>
                                <p className='text-xs font-semibold text-gray-400 uppercase'>Email Support</p>
                                <p className='text-gray-900 text-sm '>support@mail.com</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-4 bg-gray-50 p-2 rounded-xl border border-gray-100'>
                            <div className='w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl'>
                                <IoLocationOutline />
                            </div>
                            <div>
                                <p className='text-xs font-semibold text-gray-400 uppercase'>Office</p>
                                <p className='text-gray-900 text-sm'>Mirpur, Dhaka</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/3 bg-white/70 p-4 md:p-5 rounded-xl shadow-xl shadow-gray-100 border border-gray-50">
                        <form onSubmit={handleIssueSubmit} className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-semibold text-gray-600 ml-1'>Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 text-sm bg-gray-50 border border-transparent focus:border-primary focus:bg-white rounded-xl outline-none transition-all"
                                        name='name'
                                        required
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-semibold text-gray-600 ml-1'>Email</label>
                                    <input
                                        type="email"
                                        className="w-full p-3 text-sm bg-gray-50 border border-transparent focus:border-primary focus:bg-white rounded-xl outline-none transition-all"
                                        name='email'
                                        required
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-semibold text-gray-600 ml-1'>How can we help you?</label>
                                <textarea
                                    name="issue"
                                    rows={4}
                                    className="w-full p-3 text-sm  bg-gray-50 border border-transparent focus:border-primary focus:bg-white rounded-xl outline-none transition-all resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type='submit'
                                className="w-full md:w-auto px-5 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;