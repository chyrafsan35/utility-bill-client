import React from 'react';
import { BiHelpCircle, BiQuestionMark, BiBookOpen, BiSupport } from 'react-icons/bi';
import { Link } from 'react-router';

const Help = () => {
    const faqs = [
        {
            question: "How do I add a new bill?",
            answer: "Go to your Dashboard and click on the 'Add Bill' button. Fill in the bill type (Electricity, Gas, Water, etc.), amount, and due date, then save it."
        },
        {
            question: "Can I download my payment history?",
            answer: "Yes! In the 'My Bills' section, you can see a list of all your paid bills. Click the 'Download' or 'Print' icon next to any bill to save a PDF copy."
        },
        {
            question: "How is my spending analysis calculated?",
            answer: "Our system takes all your recorded bills and groups them by month and category to generate the visual charts you see on your Dashboard."
        },
        {
            question: "Is my data secure?",
            answer: "Absolutely. We use industry-standard encryption and Firebase authentication to ensure that only you can access your personal bill information."
        }
    ];

    return (
        <div className=" min-h-screen p-6 md:p-12">
            <div className="max-w-4xl mx-auto text-center mb-12">
                <div className="inline-flex p-3 bg-primary/30 text-primary rounded-2xl mb-4">
                    <BiHelpCircle size={32} />
                </div>
                <h1 className="text-3xl font-extrabold text-gray-800">How can we help you today?</h1>
                <p className="text-gray-500 mt-2">Find answers to common questions or reach out to our support team.</p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {/* Quick Help Cards */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                    <div className="text-emerald-500 flex justify-center mb-3"><BiBookOpen size={28} /></div>
                    <h3 className="font-bold text-gray-800">User Guide</h3>
                    <p className="text-xs text-gray-400 mt-1">Learn how to use all features</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                    <div className="text-blue-500 flex justify-center mb-3"><BiQuestionMark size={28} /></div>
                    <h3 className="font-bold text-gray-800">FAQ Section</h3>
                    <p className="text-xs text-gray-400 mt-1">Instant answers to common queries</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                    <div className="text-purple-500 flex justify-center mb-3"><BiSupport size={28} /></div>
                    <h3 className="font-bold text-gray-800">24/7 Support</h3>
                    <p className="text-xs text-gray-400 mt-1">Contact our expert team</p>
                </div>
            </div>

            {/* FAQ Accordion Section */}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-6 px-2">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="collapse collapse-plus bg-white border border-gray-100 rounded-2xl shadow-sm">
                            <input type="radio" name="my-accordion-3" defaultChecked={index === 0} />
                            <div className="collapse-title text-md font-semibold text-gray-700">
                                {faq.question}
                            </div>
                            <div className="collapse-content text-sm text-gray-500">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="max-w-3xl mx-auto mt-16 p-8 bg-primary rounded-xl text-center text-white">
                <h3 className="text-xl font-bold">Still have questions?</h3>
                <p className="mt-2 text-white">If you couldn't find what you're looking for, please contact our support team.</p>
                <Link to={'/contact'} className="mt-6 btn bg-white text-primary border-none hover:bg-emerald-50 px-8 rounded-xl font-bold">
                    Contact Support
                </Link>
            </div>
        </div>
    );
};

export default Help;