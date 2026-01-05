import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { BiCategory, BiCalendarAlt } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import { LuSearchX } from 'react-icons/lu';
import Loading from '../Loading/Loading';

const Bills = () => {
    const [bills, setBills] = useState([]);
    const [totalBills, setTotalBills] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [sort, setSort] = useState("date");
    const [order, setOrder] = useState("");
    const [searchText, setSearchText] = useState("")
    const [loading, setLoading] = useState(true)
    const limit = 10;

    const handleSelect = (e) => {
        const sortText = e.target.value;
        setSort(sortText.split('-')[0]);
        setOrder(sortText.split('-')[1]);
    }

    const handleSearch = (e) => {
        setSearchText(e.target.value);
    }

    useEffect(() => {
        fetch(`https://utility-api-server.vercel.app/bills?limit=${limit}&skip=${currentPage * limit}&sort=${sort}&order=${order}&search=${searchText}`)
            .then(res => res.json())
            .then(data => {
                setBills(data.bills);
                setTotalBills(data.total)
                const page = Math.ceil(data.total / limit)
                setTotalPage(page)
                setLoading(false)
            })
            .catch(err => console.error(err));
    }, [currentPage, sort, order, searchText]);

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

                <div className='flex mb-8 justify-between gap-3'>
                    <label className="input input-primary">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input onChange={handleSearch} type="search" required placeholder="Search" />
                    </label>

                    <select onClick={handleSelect} defaultValue="Sort by order" className="select select-primary">
                        <option disabled={true}>Sort by order</option>
                        <option value={'date-asc'}>Ascending by date</option>
                        <option value={'date-desc'}>Descending by date</option>
                        <option value={'amount-asc'}>Amount : Low-High</option>
                        <option value={'amount-desc'}>Amount : High-Low</option>
                    </select>
                </div>

                {
                    loading ? <Loading></Loading> :
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                            {bills.length > 0 ?
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
                                :
                                (
                                    <div className='col-span-full py-20 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200'>
                                        <div className='flex flex-col items-center justify-center'>
                                            <div className='w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                                                <LuSearchX size={30} />
                                            </div>
                                            <h3 className='text-lg font-bold text-gray-800'>No Bills Found</h3>
                                            <p className='text-gray-500 text-sm max-w-xs mx-auto'>
                                                We couldn't find any bills matching "{searchText}". Please try a different keyword or check your spelling.
                                            </p>
                                            <button
                                                onClick={() => setSearchText("")}
                                                className='mt-6 text-primary font-bold hover:underline'
                                            >
                                                Clear Search
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                }
                <div className='flex justify-center flex-wrap gap-3 pt-15'>
                    {
                        currentPage > 0 &&
                        <button className='cursor-pointer' onClick={() => setCurrentPage(currentPage - 1)}><IoMdArrowDropleft /></button>
                    }
                    {
                        [...Array(totalPage).keys()].map(i => {
                            return (
                                <button onClick={() => setCurrentPage(i)} className={`btn ${i === currentPage && 'btn-primary'}`}>{i + 1}</button>
                            )
                        })
                    }
                    {
                        currentPage < totalPage - 1 &&
                        <button className='cursor-pointer' onClick={() => setCurrentPage(currentPage + 1)}><IoMdArrowDropright /></button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Bills;