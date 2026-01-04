import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { BiCategory, BiCalendarAlt } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";

const Bills = () => {
    const [bills, setBills] = useState([]);
    const [totalBills, setTotalBills] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const limit = 10;

    useEffect(() => {
        fetch(`https://utility-api-server.vercel.app/bills?limit=${limit}&skip=${currentPage*limit}`)
            .then(res => res.json())
            .then(data => {
                setBills(data.bills);
                setTotalBills(data.total)
                const page = Math.ceil(data.total / limit)
                setTotalPage(page)
            })
            .catch(err => console.error(err));
    }, [currentPage]);

    console.log(totalBills, totalPage)

    const billTag = (billInfo) => {
        const now = new Date();
        const bill = new Date(billInfo.date);
        if (
            bill.getMonth() === now.getMonth() &&
            bill.getFullYear() === now.getFullYear()
        ) {
            return "Active";
        }

        if (bill > now) {
            return "Upcoming"
        }
        return "Due"
    };

    return (
        <div className='min-h-screen'>
            <div className='max-w-[1440px] mx-auto px-6 py-12'>
                <header className="mb-12 text-left border-b border-gray-200 pb-6">
                    <h1 className="text-xl font-bold text-gray-900 tracking-tight">Bills & Services</h1>
                    <p className="text-sm mt-2 text-gray-500">Manage your active services, monitor usage, and settle outstanding payments.</p>
                </header>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                    {
                        bills.map(bill => (
                            <div key={bill._id} className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-4 flex flex-col justify-between">

                                <div>
                                    <div className='flex justify-between items-start mb-4'>
                                        <div className='p-3 bg-primary/40 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors'>
                                            <img className='w-8 h-8 object-contain filter grayscale group-hover:invert brightness-0 invert' src={bill.image} alt={bill.category} />
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md 
                                                ${billTag(bill) === 'Active' ? 'text-primary bg-primary/30' :
                                                billTag(bill) === 'Upcoming' ? 'text-yellow-500 bg-yellow-500/30' :
                                                    'text-red-600 bg-red-600/30'
                                            }
                                            `}>{billTag(bill)}</span>
                                    </div>

                                    <h3 className="text-xs text-gray-400 uppercase tracking-widest">{bill.category}</h3>
                                    <h2 className="text-lg font-semibold text-gray-800 mt-1 line-clamp-1">{bill.title}</h2>

                                    <p className='text-xl font-black text-gray-900 mt-2 tracking-tight'>৳ {bill.amount}</p>

                                    <div className='mt-6 space-y-3 border-t border-gray-50 pt-4'>
                                        <p className='flex items-center gap-2 text-sm text-gray-600'>
                                            <CiLocationOn className="text-blue-500 font-bold" /> {bill.location}
                                        </p>
                                        <p className='flex items-center gap-2 text-xs text-gray-400 font-medium'>
                                            <BiCalendarAlt /> Last Date: {bill.date}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-2">
                                    <Link to={`/billDetails/${bill._id}`} className='flex-1 text-center bg-primary hover:bg-primary/80 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors'>
                                        Pay Bill
                                    </Link>
                                    <Link to={`/billDetails/${bill._id}`} className='px-4 py-2.5 text-primary border border-primary rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors'>
                                        Details
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='flex justify-center flex-wrap gap-3 pt-15'>
                    {
                        [...Array(totalPage).keys()].map(i => {
                            return (
                                <button onClick={()=>setCurrentPage(i)} className='btn btn-primary text-white'>{i+1}</button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Bills;