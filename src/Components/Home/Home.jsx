import React, { useEffect, useState } from 'react';
import RecentBills from '../RecentBills/RecentBills';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import CustomerReviews from '../CustomerReviews/CustomerReviews';
import Stats from '../Stats/Stats';
import CTA from '../CTA/CTA';
import Loading from '../Loading/Loading';
import HowItWorks from '../HowItWorks/HowItWorks';
import Security from '../S&T/Security';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import Help from '../Help/Help';

const Home = () => {
    const [recentBills, setRecentBills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://utility-api-server.vercel.app/recent-bills')
            .then(res => res.json())
            .then(data => {
                setRecentBills(data)
                setLoading(false)
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <Banner></Banner>

            <div>
                <Category></Category>
            </div>

            {
                loading ? <Loading></Loading> :
                    <div>
                        <RecentBills recentBills={recentBills}></RecentBills>
                    </div>
            }

            <div>
                <HowItWorks></HowItWorks>
            </div>

            <div>
                <Security></Security>
            </div>

            <div>
                <Stats></Stats>
            </div>

            <div>
                <CTA></CTA>
            </div>

            <div>
                <WhyChooseUs></WhyChooseUs>
            </div>

            <div>
                <CustomerReviews></CustomerReviews>
            </div>

            <div>
                <Help></Help>
            </div>
        </div>
    );
};

export default Home;