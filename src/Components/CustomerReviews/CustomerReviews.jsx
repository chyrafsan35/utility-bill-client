import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from '../ReviewCard/ReviewCard';

const CustomerReviews = () => {

    const [review, setReviews] = useState([]);

    useEffect(()=>{
        const reviews = fetch('https://utility-api-server.vercel.app/reviews')
        .then(res=>res.json())
        .then(data=>setReviews(data))
    },[])

    return (
        <div className='pt-15 text-[#1A1A1A]'>
            <h2 className='text-center mb-8 font-semibold text-xl'>Customer Feedbacks</h2>
            <>
                <Swiper

                    loop={true}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={4}
                    coverflowEffect={{
                        rotate: 30,
                        stretch: '25%',
                        depth: 150,
                        modifier: 1,
                        scale: 0.75,
                        slideShadows: true,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {
                        review.map(data =>
                            <SwiperSlide>
                                <ReviewCard key={data.id} data={data}></ReviewCard>
                            </SwiperSlide>)
                    }

                </Swiper>

            </>
        </div>
    );
};

export default CustomerReviews;