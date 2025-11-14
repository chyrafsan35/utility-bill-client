import React from 'react';
import FrontBills from '../FrontBills/FrontBills';
// import bgBill from '../../assets/bg_bill.jpg';

const RecentBills = ({ recentBills }) => {

    return (
        <div className='max-w-[1440px] mx-auto px-3 py-10'>
            <h2 className='text-center font-semibold text-2xl py-10'>Recent Bills</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    recentBills.map(bill => <FrontBills key={bill._id} bill={bill}></FrontBills>)
                }
            </div>
        </div>
    );
};

export default RecentBills;