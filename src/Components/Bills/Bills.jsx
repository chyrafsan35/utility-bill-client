import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import tree from '../../assets/tree-branch.png';

const Bills = () => {

    const [bills, setBills] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/bills')
            .then(res => res.json())
            .then(data => setBills(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className='bg-gradient-to-r from-[#FA8282] to-[#FF3636] relative overflow-hidden'>
            <img className='max-w-[300px] md:max-w-[500px] absolute right-0 top-[-150px]' src={tree} alt="" />
            <div className='max-w-[1440px] mx-auto px-3 py-10'>
                <h2 className='text-center font-semibold text-2xl py-10'>BILLS - Pay As You Go</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        bills.map(bill => <div className="card bg-base-100 w-96 shadow-sm mx-auto">
                            <div className="card-body">
                                <div>
                                    <img src={bill.image} alt="" />
                                </div>
                                <h2 className="card-title">{bill.title}</h2>
                                <p><span className='px-2 py-1 text-center rounded-[15px]  bg-[#FA8282] mr-3'>Category </span> {bill.category}</p>
                                <p><span className='px-2 py-1 text-center rounded-[15px]  bg-[#FA8282] mr-3'>Location </span> {bill.location}</p>
                                <p>{bill.date}</p>
                                <div className="card-actions justify-end">
                                    <Link to={`/billDetails/${bill._id}`} className='btn btn-neutral mt-4'>See Details</Link>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Bills;