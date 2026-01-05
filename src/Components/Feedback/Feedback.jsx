import React, { use, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const Feedback = () => {
    const [rating, setRating] = useState(0);
    const { user } = use(AuthContext);

    console.log(rating)

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        const feedbackData = {
            username: user.displayName,
            useremail: user.email,
            ratings: rating,
            review: e.target.feedback.value,
            date: new Date().toISOString().split('T')[0],
        }

        fetch('https://utility-api-server.vercel.app/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(feedbackData)
        })
            .then(res => res.json())
        Swal.fire({
            title: "Feedback Sent",
            icon: "success",
            draggable: true
        });
        e.target.reset();
        setRating(0)
    }

    return (
        <div className='min-h-screen  py-15 px-5'>
            <div className='max-w-[1200px] mx-auto'>
                <div className='text-center mb-16'>
                    <h2 className='text-2xl font-black text-gray-900 mb-4'>Share Your Experience</h2>
                    <p className='text-gray-500 max-w-xl mx-auto text-sm'>
                        Your feedback helps us make our platform better.
                    </p>
                </div>

                <div className='flex flex-col lg:flex-row gap-12 items-start justify-center'>

                    <div className="w-full lg:w-2/3 bg-white/70 p-4 md:p-5 rounded-xl shadow-xl shadow-gray-100 border border-gray-50">
                        <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                            <h2 className='text-sm font-semibold text-center'>Overall Satisfaction?</h2>
                            <div className='flex gap-2 justify-center items-center'>
                                {
                                    [...Array(5)].map((_, index) => {
                                        const starValue = index + 1;
                                        return (
                                            <button className='transition-transform duration-200 hover:scale-125' index={starValue} onClick={() => { setRating(starValue) }}>
                                                <FaStar size={25} className={`cursor-pointer transition-colors duration-200 ${starValue <= rating ?
                                                        'text-primary shadow-primary' :
                                                        'text-gray-200'
                                                    }`} />
                                            </button>
                                        )
                                    })
                                }
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-semibold text-gray-600 ml-1'>Tell us more (optional)</label>
                                <textarea
                                    name="feedback"
                                    rows={4}
                                    className="w-full p-3 text-sm  bg-gray-50 border border-transparent focus:border-primary focus:bg-white rounded-xl outline-none transition-all resize-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type='submit'
                                className="w-full md:w-auto px-5 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Feedback;