import React, { use, useRef } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const BillDetails = () => {
    const pageLocation = useLocation();
    console.log(pageLocation.state);
    const detailedBill = useLoaderData();
    console.log(detailedBill)
    const { _id, title, category, location, description, image, amount, date } = detailedBill;

    const billDate = new Date(date);
    const currentDate = new Date();

    const isCurrentMonth =
        billDate.getMonth() === currentDate.getMonth() &&
        billDate.getFullYear() === currentDate.getFullYear();

    const refModal = useRef();
    const navigate = useNavigate();

    const handleModal = () => {
        if (!user) {
            return navigate('/login')
        }
        refModal.current.showModal();
    }

    const { user } = use(AuthContext)

    const handleBilling = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const amount = e.target.amount.value;
        const address = e.target.address.value;
        const phone = e.target.phone.value;
        const date = e.target.date.value;
        const additional = e.target.additional.value;
        const billCat = category;
        console.log(additional)

        const addedBill = {
            username: username,
            email: email,
            amount: amount,
            address: address,
            phone: phone,
            date: date,
            category: billCat
        }

        fetch('https://utility-api-server.vercel.app/usersBills', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addedBill)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Billing data added', data);
                Swal.fire({
                    title: "Bill Paid",
                    icon: "success",
                    draggable: true
                });
                e.target.reset();
            })
    }

    return (
        <div className=''>
            <div className='min-h-screen bg-gray-50 py-10 px-5'>
                <div className='max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden'>

                    <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900 leading-tight">{title}</h1>
                            <p className="text-gray-500 mt-1 flex items-center gap-2">
                                <span className="p-1.5 bg-primary/20 text-primary rounded-md text-xs font-bold uppercase tracking-wider">{category}</span>
                                • ID: {_id}
                            </p>
                        </div>
                        <div className={`px-4 py-2 rounded-full font-bold text-sm ${isCurrentMonth ? 'bg-orange-50 text-orange-600' : 'bg-primary/30 text-primary'}`}>
                            {isCurrentMonth ? "● Payment Pending" : "● Paid / No Action Required"}
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-8 p-8'>
                        <div className='w-full md:w-1/3 flex justify-center items-center  rounded-xl p-10 border-dashed'>
                            <img
                                src={image}
                                className="max-w-[120px] h-auto object-contain transition-transform hover:scale-110 duration-300"
                                alt={title}
                            />
                        </div>

                        <div className="flex-1 space-y-6">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">Service Description</h3>
                                <p className="text-gray-700 leading-relaxed text-sm">{description}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <span className="block text-xs font-bold text-gray-400 uppercase">Location</span>
                                    <span className="text-gray-900 font-semibold text-sm">{location}</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <span className="block text-xs font-bold text-gray-400 uppercase">Billing Date</span>
                                    <span className="text-gray-900 font-semibold text-sm">{date}</span>
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase">Total Amount Due</span>
                                    <span className="text-2xl font-black">৳ {amount || "0.00"}</span>
                                </div>

                                <button
                                    onClick={handleModal}
                                    disabled={!isCurrentMonth}
                                    className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg ${isCurrentMonth
                                        ? 'bg-primary text-white hover:bg-primary/80 hover:shadow-green-200 cursor-pointer'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    {isCurrentMonth ? "Pay Now" : "Paid"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <dialog ref={refModal} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Bill Information</h3>

                    <form onSubmit={handleBilling} class="space-y-4">

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Email</label>
                            <input name="email" type="email" readOnly defaultValue={user?.email || ''}
                                class="mt-1 block w-full rounded-md border-gray-200 shadow-sm bg-gray-100 focus:ring focus:ring-indigo-200 p-2"
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Bill ID</label>
                            <input name="billId" type="text" readOnly
                                class="mt-1 block w-full rounded-md border-gray-200 bg-gray-100 p-2"
                                defaultValue={_id} />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Amount</label>
                            <div class="mt-1 relative rounded-md shadow-sm">
                                <input name="amount" type="text" readOnly
                                    class="block w-full pr-12 rounded-md border-gray-200 bg-gray-100 p-2"
                                    defaultValue={amount} />
                                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">

                                </div>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Username</label>
                            <input name="username" type="text" required minLength="2"
                                class="mt-1  border block w-full rounded-md border-gray-300 p-2"
                                placeholder="Your full name" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Address</label>
                            <input name="address" type="text"
                                class="mt-1 border block w-full rounded-md border-gray-300 p-2"
                                placeholder="Your address (street, area, city)" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Phone</label>
                            <input name="phone" type="tel" required
                                pattern="^\+?\d{8,15}$"
                                title="Enter a valid phone number (8–15 digits, optional leading +)"
                                class="mt-1 border block w-full rounded-md border-gray-300 p-2"
                                placeholder="+8801XXXXXXXXX" />

                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Date</label>
                            <input name="date" type="text" readOnly
                                class="mt-1 block w-full rounded-md border-gray-200 bg-gray-100 p-2"
                                defaultValue={date} />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Additional info (optional)</label>
                            <textarea name="additional" rows="3"
                                class="mt-1 block w-full rounded-md border border-gray-300 p-2"
                                placeholder="Any extra details (notes, reference, etc.)"></textarea>
                        </div>

                        <div class="">
                            <button type="submit"
                                class="w-full inline-flex justify-center rounded-md btn btn-primary text-white mt-4 px-4 py-2  font-medium  disabled:opacity-60"
                            >
                                Pay Bill
                            </button>
                            <p class="text-sm mt-2 text-red-500 hidden"></p>
                        </div>
                    </form>

                    <div className="modal-action pt-4">
                        <form method="dialog">
                            <button className="btn btn-primary text-white mt-4">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default BillDetails;