import React from 'react';
import { BiUserPlus, BiPlusCircle, BiBarChartAlt2 } from 'react-icons/bi';

const HowItWorks = () => {
    const steps = [
        { id: 1, title: 'Create Account', desc: 'Sign up in seconds to start.', icon: <BiUserPlus size={20} />, color: 'bg-blue-50 text-blue-500' },
        { id: 2, title: 'Add Bills', desc: 'Enter your utility bill details.', icon: <BiPlusCircle size={20} />, color: 'bg-emerald-50 text-emerald-500' },
        { id: 3, title: 'Track Progress', desc: 'View charts and pay on time.', icon: <BiBarChartAlt2 size={20} />, color: 'bg-purple-50 text-purple-500' },
    ];

    return (
        <section className="py-15 ">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight">How It Works</h2>
                    <p className="text-gray-500 mt-2">Manage your bills in 3 simple steps</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map(step => (
                        <div key={step.id} className="flex flex-col items-center text-center">
                            <div className={`w-15 h-15 ${step.color} rounded-3xl flex items-center justify-center mb-6 shadow-sm`}>
                                {step.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">{step.title}</h3>
                            <p className="text-gray-500 mt-2 max-w-xs text-sm">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;