import React from 'react';
import { Link } from 'react-router';
import '../../App.css'

const FrontBills = ({bill}) => {
    const {_id,title, category, location, date} = bill;
    return (
        <div className="card bg-base-100 w-96 shadow-sm mx-auto">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p><span className='px-2 py-1 text-center rounded-[15px]  bg-[#F59887] mr-3'>Category </span> {category}</p>
                <p><span className='px-2 py-1 text-center rounded-[15px]  bg-[#F59887] mr-3'>Location </span> {location}</p>
                <p>{date}</p>
                <div className="card-actions justify-end">
                    <Link to={`/billDetails/${_id}`} className='btn com_btn'>See Details</Link>
                </div>
            </div>
        </div>
    );
};

export default FrontBills;