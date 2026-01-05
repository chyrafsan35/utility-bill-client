import React from 'react';
import bg1 from '../../assets/utility-bill-bg.png';
import bg2 from '../../assets/utility-bill-bg3.png';
import stack from '../../assets/stack-of-currency.png';
import { Link } from 'react-router';

const CTA = () => {
    return (
        <section
            className="mt-15 bg-center bg-cover bg-no-repeat bg-white/70"
            style={{ backgroundImage: `url(${bg1})` }}
        >
            <div className=" backdrop-blur-sm max-w-[1440px] mx-auto">
                <div className="max-w-[1440px] mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">

                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                            Smart Bill Management <br /> Made Simple
                        </h2>

                        <p className="mt-4 text-gray-600 text-md max-w-xl">
                            Manage electricity, gas, water, internet, and rent bills
                            from one secure dashboard. Stay organized and never miss
                            a payment again.
                        </p>

                        <div className="mt-6 flex gap-4">
                            <Link to={'/register'} className="btn bg-white text-primary border border-primary cursor-pointer px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition">
                                Get Started
                            </Link>
                            <Link to={'/about-us'} className="btn px-6 py-3 rounded-lg border border-gray-300 cursor-pointer text-gray-700 hover:bg-gray-100 transition">
                                Learn More
                            </Link>
                        </div>
                    </div>

                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src={stack}
                            alt="Finance illustration"
                            className="w-[280px] md:w-[360px] lg:w-[420px]"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CTA;
