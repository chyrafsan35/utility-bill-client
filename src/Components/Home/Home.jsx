import React, { useEffect, useState } from 'react';
import RecentBills from '../RecentBills/RecentBills';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import CustomerReviews from '../CustomerReviews/CustomerReviews';
import Stats from '../Stats/Stats';
import CTA from '../CTA/CTA';

const Home = () => {
    const [recentBills, setRecentBills] = useState([]);

    useEffect(() => {
        fetch('https://utility-api-server.vercel.app/recent-bills')
            .then(res => res.json())
            .then(data => setRecentBills(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <Banner></Banner>

            <div>
                <Category></Category>
            </div>

            <div>
                <RecentBills recentBills={recentBills}></RecentBills>
            </div>

            <div>
                <Stats></Stats>
            </div>

            <div>
                <CTA></CTA>
            </div>

            <div>
                <CustomerReviews></CustomerReviews>
            </div>
        </div>
    );
};

export default Home;