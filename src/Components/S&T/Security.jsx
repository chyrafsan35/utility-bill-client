import React from 'react';
import { BiShieldQuarter, BiLockAlt, BiCheckShield, BiData } from 'react-icons/bi';

const Security = () => {
    const trustFeatures = [
        {
            id: 1,
            title: "Bank-Level Encryption",
            description: "Your financial data is encrypted with 256-bit SSL security, the same level used by major banks.",
            icon: <BiLockAlt size={22} />,
            color: "text-blue-500",
            bgColor: "bg-blue-50"
        },
        {
            id: 2,
            title: "Verified Payments",
            description: "Every transaction is verified through secure gateways to ensure your money reaches the right place.",
            icon: <BiCheckShield size={22} />,
            color: "text-emerald-500",
            bgColor: "bg-emerald-50"
        },
        {
            id: 3,
            title: "Data Privacy",
            description: "We never share your personal information or bill history with third parties without your consent.",
            icon: <BiData size={22} />,
            color: "text-purple-500",
            bgColor: "bg-purple-50"
        }
    ];

    return (
        <section className="py-15 bg-gray-50">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">

                    <div className="md:w-1/2">
                        <div className="inline-flex items-center gap-2 px-2 py-1 bg-primary/30 text-primary rounded-full text-sm font-semibold mb-6">
                            <BiShieldQuarter /> 100% SECURE PLATFORM
                        </div>
                        <h2 className="text-xl md:text-2xl font-black text-gray-800 leading-tight">
                            Your Security is Our <br />
                            <span className="text-primary/80">Top Priority</span>
                        </h2>
                        <p className="mt-6 text-gray-600 text-sm leading-relaxed">
                            We understand that managing utility bills involves sensitive information.
                            That's why we use cutting-edge technology to keep your dashboard and
                            payment history safe from any unauthorized access.
                        </p>

                        <div className="mt-10 p-6 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-6">
                            <div className="w-16 h-16 bg-primary/80 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                <BiShieldQuarter size={25} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">ISO Certified Security</h4>
                                <p className="text-sm text-gray-400">Trusted by over 10,000+ users monthly</p>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 grid grid-cols-1 gap-6">
                        {trustFeatures.map(feature => (
                            <div
                                key={feature.id}
                                className="group p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 flex gap-6"
                            >
                                <div className={`shrink-0 w-16 h-16 ${feature.bgColor} ${feature.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                                    <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Security;