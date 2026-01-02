import React from 'react';
import FrontBills from '../FrontBills/FrontBills';

const RecentBills = ({ recentBills }) => {

    return (
        <div className='max-w-[1440px] mx-auto pt-15'>
            <h2 className='text-center font-semibold text-xl mb-8'>Recent Bills</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                {
                    recentBills.map(bill => <FrontBills key={bill._id} bill={bill}></FrontBills>)
                }
            </div>
        </div>
    );
};

export default RecentBills;