import React from 'react';
import FrontBills from '../FrontBills/FrontBills';

const RecentBills = ({ recentBills }) => {

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                recentBills.map(bill=><FrontBills key={bill._id} bill={bill}></FrontBills>)
            }
        </div>
    );
};

export default RecentBills;