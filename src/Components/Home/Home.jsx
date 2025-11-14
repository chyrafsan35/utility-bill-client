import React, { useEffect, useState } from 'react';
import RecentBills from '../RecentBills/RecentBills';
import Banner from '../Banner/Banner';

const Home = () => {
    const [recentBills, setRecentBills] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/recent-bills')
            .then(res => res.json())
            .then(data => setRecentBills(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <Banner></Banner>
            <div className='max-w-[1440px] mx-auto'>
                <RecentBills recentBills={recentBills}></RecentBills>
            </div>
        </div>
    );
};

export default Home;