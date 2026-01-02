import React from 'react';
import FrontBills from '../FrontBills/FrontBills';

const RecentBills = ({ recentBills }) => {

    return (
        <div className='max-w-[1440px] mx-auto pt-15'>
            <div className="text-center mb-8">
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                    Recent Bills
                </h2>
                <p className="text-gray-500 mt-2">
                    Top featured bills paid by users
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                {
                    recentBills.map(bill => <FrontBills key={bill._id} bill={bill}></FrontBills>)
                }
            </div>
        </div>
        
    );
};

export default RecentBills;