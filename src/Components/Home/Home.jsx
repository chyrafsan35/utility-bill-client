import React, { useEffect, useState } from 'react';
import RecentBills from '../RecentBills/RecentBills';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import tree from '../../assets/tree-branch.png';

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

            <div className='max-w-[1440px] mx-auto px-5 py-10'>
                <Category></Category>
            </div>

            <div className=' bg-gradient-to-r from-[#F5DA8C] to-[#EDD180] relative overflow-hidden'>
                <img className='max-w-[300px] md:max-w-[500px] absolute right-0 top-[-150px]' src={tree} alt="" />
                <RecentBills recentBills={recentBills}></RecentBills>
            </div>
        </div>
    );
};

export default Home;