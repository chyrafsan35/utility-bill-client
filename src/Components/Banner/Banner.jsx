import React from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const Banner = () => {
    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=60",
            text: "Pay your bills on time — Save late fees"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=60",
            text: "Track monthly expenses easily"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=60",
            text: "Secure and fast payments"
        },
        {
            id: 4,
            image: "https://media.istockphoto.com/id/2078490118/photo/businessman-using-laptop-to-online-payment-banking-and-online-shopping-financial-transaction.jpg?s=612x612&w=0&k=20&c=1x2G24ANsWxG4YW6ZaoeFPEzjmKFE4ZlohVQSwbjGj8=",
            text: "All your bills in one dashboard"
        },
        {
            id: 5,
            image: "https://st4.depositphotos.com/15971766/22010/i/450/depositphotos_220100076-stock-photo-stacks-documents-files-black-clip.jpg",
            text: "Download detailed PDF reports"
        }
    ];

    return (
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 2500 }}
                pagination={{ clickable: true }}
                loop={true}
                className="h-full"
            >
                {slides.map(slide => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="h-full w-full bg-cover bg-center relative flex items-center justify-center"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat"
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/40"></div>

                            <h1 className="relative z-10 text-white 
                                text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 
                                font-bold bg-black/50 backdrop-blur-sm 
                                rounded-lg px-4 py-2 text-center max-w-[90%]">
                                {slide.text}
                            </h1>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
