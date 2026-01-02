import React from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip'
import { MdElectricBolt, MdPhoneAndroid } from "react-icons/md";
import { FaFire } from "react-icons/fa6";
import { FaHandHoldingWater } from "react-icons/fa";
import { MdSignalWifiStatusbarConnectedNoInternet3 } from "react-icons/md";
import { LuHouse } from "react-icons/lu";

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
        {
            id: 5,
            name: "Rent",
            icon: <LuHouse />,
            color: "from-green-200 to-green-400",
            tooltip: "Manage your rent payments easily and never miss a due date.",
            description:
                "Track your monthly rent payments, due dates, and payment history in one place. Stay organized and ensure timely rent payments without hassle.",
        },
        {
            id: 6,
            name: "Mobile",
            icon: <MdPhoneAndroid />,
            color: "from-indigo-200 to-indigo-400",
            tooltip: "Manage your mobile bills and stay connected without interruptions.",
            description:
                "Track your mobile bill payments, data usage, and due dates easily. Avoid service interruptions by paying your mobile bills on time.",
        }
    ];

    return (
        <div className="max-w-[1440px] mx-auto pt-15">
            <h2 className="text-center text-xl font-semibold mb-8">Service Categories</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 ">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className={`p-3 rounded-xl shadow-sm bg-white text-center hover:scale-105 transform transition max-w-86 mx-auto`}
                    >
                        <div>
                            <div
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={cat.tooltip}
                                data-tooltip-place="top"
                                className="flex justify-center mb-2 mt-2 border rounded-[100%] w-[30px] h-[30px] text-center mx-auto items-center bg-white">{cat.icon}</div>
                            <h3 className="text-sm font-semibold mb-2">{cat.name}</h3>
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