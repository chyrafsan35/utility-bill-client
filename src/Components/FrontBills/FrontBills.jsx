import React from 'react';
import { Link } from 'react-router';
import '../../App.css'
import { BiCategory } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";

const FrontBills = ({bill}) => {
    const {_id,title, category, location, date} = bill;
    return (
        <div className="card bg-base-100 w-86 shadow-sm mx-auto px-0 text-sm">
            <div className="card-body">
                <h2 className="card-title text-center text-sm">{title}</h2>
                <p className='flex items-center gap-1'> <BiCategory />  {category}</p>
                <p className='flex items-center gap-1'> <CiLocationOn />  {location}</p>
                <p>{date}</p>
                <div className="card-actions justify-end">
                    <Link to={`/billDetails/${_id}`} className='btn mt-4 px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/70 transition'>See Details</Link>
                </div>
            </div>
        </div>
    );
};

export default FrontBills;