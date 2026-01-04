import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Loading from '../../Components/Loading/Loading';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { BiWallet, BiReceipt, BiCategory } from 'react-icons/bi';

const DashboardHome = () => {
    const { user } = use(AuthContext);
    const [billData, setBillData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://utility-api-server.vercel.app/usersBills/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setBillData(data);
                    setLoading(false);
                });
        }
    }, [user.email]);

    // ডাটা প্রসেসিং
    const charData = billData.map(bill => ({
        date: bill.date,
        amount: Number(bill.amount),
        category: bill.category
    }));

    // ক্যালকুলেশন (Stats Cards এর জন্য)
    const totalSpent = charData.reduce((sum, item) => sum + item.amount, 0);
    const totalBills = charData.length;

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="p-4 md:p-8 min-h-screen">
            <header className="mb-8">
                <h1 className="text-xl font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-gray-500 text-sm">Welcome back, {user?.displayName || 'User'}!</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                        <BiWallet size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Total Spent</p>
                        <h3 className="text-sm font-bold text-gray-800">৳ {totalSpent}</h3>
                    </div>
                </div>

                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                        <BiReceipt size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Bills Paid</p>
                        <h3 className="text-sm font-bold text-gray-800">{totalBills} Bills</h3>
                    </div>
                </div>

                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                        <BiCategory size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Last Activity</p>
                        <h3 className="text-sm font-bold text-gray-800">{charData[0]?.date || 'N/A'}</h3>
                    </div>
                </div>
            </div>

            {/* Main Chart Section */}
            <div className='p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 bg-white'>
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className='text-lg font-bold text-gray-800'>Spending Analysis</h2>
                        <p className="text-xs text-gray-400">Visualizing your monthly utility expenses</p>
                    </div>
                    <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100">
                        Live Data
                    </div>
                </div>

                <div className='w-full h-[350px]'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={charData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis
                                dataKey="date"
                                hide
                                tick={{ fontSize: 16, fill: '#9ca3af' }}
                            />
                            <YAxis
                                tick={{ fontSize: 16, fill: '#9ca3af' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: '#f9fafb' }}
                                contentStyle={{
                                    borderRadius: '12px',
                                    border: 'none',
                                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                    padding: '12px'
                                }}
                            />
                            <Bar
                                dataKey="amount"
                                fill="#10b981"
                                radius={[6, 6, 0, 0]}
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-50 flex justify-center">
                    <p className="text-xs text-gray-400">
                        System generated report for: <span className="text-emerald-500 font-medium">{user?.email}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;