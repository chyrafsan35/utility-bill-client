import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from '../ReviewCard/ReviewCard';

const CustomerReviews = () => {

    const [review, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://utility-api-server.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <div className='max-w-[1440px] mx-auto pt-15 text-[#1A1A1A]'>
            <div className="text-center mb-8">
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                    Customer Feedbacks
                </h2>
                <p className="text-gray-500 mt-2">
                    Active users rated feedbacks
                </p>
            </div>
            <>
                <Swiper
                    loop={true}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}

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

                    pagination={{ clickable: true }}

                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 5,
                        },
                        640: {
                            slidesPerView: 1.5,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 25,
                        },
                    }}

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
            {/* Divider */}
            <div className="mt-30 border-t border-gray-100"></div>
        </div>
    );
};

export default CustomerReviews;