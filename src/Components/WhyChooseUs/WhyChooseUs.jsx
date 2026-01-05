import React from 'react';
import { BiRocket, BiBell, BiCloudDownload, BiSupport, BiPieChartAlt2, BiMobileAlt } from 'react-icons/bi';

const WhyChooseUs = () => {
    const features = [
        {
            id: 1,
            title: "Lightning Fast",
            desc: "Add and manage your bills in seconds with our optimized interface.",
            icon: <BiRocket size={20} />,
            color: "text-orange-500",
            bgColor: "bg-orange-50"
        },
        {
            id: 2,
            title: "Smart Reminders",
            desc: "Never miss a due date again with our automated email and app notifications.",
            icon: <BiBell size={20} />,
            color: "text-emerald-500",
            bgColor: "bg-emerald-50"
        },
        {
            id: 3,
            title: "Monthly Analytics",
            desc: "Get deep insights into your spending habits with interactive charts.",
            icon: <BiPieChartAlt2 size={20} />,
            color: "text-blue-500",
            bgColor: "bg-blue-50"
        },
        {
            id: 4,
            title: "PDF Downloads",
            desc: "Export your bill history and payment proofs as professional PDF reports.",
            icon: <BiCloudDownload size={20} />,
            color: "text-purple-500",
            bgColor: "bg-purple-50"
        },
        {
            id: 5,
            title: "Mobile Friendly",
            desc: "Access your dashboard anytime, anywhere from any device smoothly.",
            icon: <BiMobileAlt size={20} />,
            color: "text-pink-500",
            bgColor: "bg-pink-50"
        },
        {
            id: 6,
            title: "Expert Support",
            desc: "Our dedicated support team is always ready to help you with your queries.",
            icon: <BiSupport size={20} />,
            color: "text-indigo-500",
            bgColor: "bg-indigo-50"
        }
    ];

    return (
        <section className="py-15">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-sm font-semibold text-primary/80 uppercase tracking-widest mb-3">Core Features</h2>
                    <h3 className="text-lg md:text-xl font-black text-gray-800 leading-tight">
                        Why Thousands Trust Our <br /> Bill Management System
                    </h3>
                    <p className="text-gray-500 mt-4 text-sm">
                        We provide all the tools you need to stay on top of your utility bills
                        and manage your finances like a pro.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map(feature => (
                        <div
                            key={feature.id}
                            className="p-5 rounded-xl bg-gray-50 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group"
                        >
                            <div className={`w-16 h-16 ${feature.bgColor} ${feature.color} rounded-xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-12`}>
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;