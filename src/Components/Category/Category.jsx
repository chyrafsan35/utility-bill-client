import React from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip'
import { MdElectricBolt } from "react-icons/md";
import { FaFire } from "react-icons/fa6";
import { FaHandHoldingWater } from "react-icons/fa";
import { MdSignalWifiStatusbarConnectedNoInternet3 } from "react-icons/md";

const Category = () => {
    const categories = [
        {
            id: 1,
            name: "Electricity",
            icon: <MdElectricBolt />,
            color: "from-yellow-200 to-yellow-400",
            tooltip: "Pay your electricity bills on time and track your usage.",
            description:
                "Manage your electricity bills easily. Track usage, payment history, and stay on top of your monthly charges.",
        },
        {
            id: 2,
            name: "Gas",
            icon: <FaFire />,
            color: "from-red-200 to-red-400",
            tooltip: "Keep track of your gas bills and consumption efficiently.",
            description:
                "Pay your gas bills securely. Get alerts for due dates and monitor your gas consumption efficiently.",
        },
        {
            id: 3,
            name: "Water",
            icon: <FaHandHoldingWater />,
            color: "from-blue-200 to-blue-400",
            tooltip: "Monitor water bills and usage to manage expenses.",
            description:
                "Track your water usage and payments. Stay informed about your monthly water bills and manage your expenses.",
        },
        {
            id: 4,
            name: "Internet",
            icon: <MdSignalWifiStatusbarConnectedNoInternet3 />,
            color: "from-purple-200 to-purple-400",
            tooltip: "Stay connected by managing your internet bills on time.",
            description:
                "Pay your internet bills online. Monitor subscriptions, due dates, and enjoy uninterrupted connectivity.",
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-center text-3xl font-bold mb-8">Service Categories</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className={`p-6 rounded-xl shadow-md bg-gradient-to-br ${cat.color} text-center hover:scale-105 transform transition`}
                    >
                        <div>
                            <div
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={cat.tooltip}
                                data-tooltip-place="top"
                                className="flex justify-center mb-4 border rounded-[100%] w-[30px] h-[30px] text-center mx-auto items-center bg-white">{cat.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
                        </div>
                        <p className="text-sm text-gray-800">{cat.description}</p>
                    </div>
                ))}
            </div>

            <Tooltip id="my-tooltip" />
        </div>
    );
};

export default Category;