import React, { useEffect, useRef, useState } from 'react';

const Stats = () => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true)
            }
        }, { threshold: 0.40 })

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [])

    return (
        <section ref={sectionRef} className={`max-w-[1440px] mx-auto pt-20 transition-all duration-750 ease-out
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
        `}>
            <div className="text-center mb-8">
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                    Stats Overview
                </h2>
                <p className="text-gray-500 mt-2">
                    A quick look at our platform performance
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12">
                {[
                    { value: '5K+', label: 'Active Users' },
                    { value: '10K+', label: 'Paid Bills' },
                    { value: '99.9%', label: 'Uptime' },
                    { value: '24/7', label: 'Support' },
                ].map((item, index) => (
                    <div
                        key={index}
                        className={`
                            text-center transition-all duration-700 ease-out
                            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                        `}
                        style={{ transitionDelay: `${index * 130}ms` }}
                    >
                        <h3 className="text-4xl font-bold">{item.value}</h3>
                        <p className="text-sm text-gray-500 mt-2">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
