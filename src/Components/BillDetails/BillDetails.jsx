import React, { use, useRef } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import tree from '../../assets/tree-branch.png';

const BillDetails = () => {
    const detailedBill = useLoaderData();
    console.log(detailedBill)
    const { _id, title, category, location, description, image, amount, date } = detailedBill;

    const billDate = new Date(date);
    const currentDate = new Date();

    const isCurrentMonth =
        billDate.getMonth() === currentDate.getMonth() &&
        billDate.getFullYear() === currentDate.getFullYear();

    const refModal = useRef();
    const handleModal = () => {
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
        console.log(additional)

        const addedBill = {
            username: username,
            email: email,
            amount: amount,
            address: address,
            phone: phone,
            date: date
        }

        fetch('http://localhost:3000/usersBills', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(addedBill)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Billing data added', data)
                e.target.reset();
            })
    }

    return (
        <div className=' bg-gradient-to-r from-[#CC86F0] to-[#8C1AC9] relative overflow-hidden'>
            <img className='max-w-[300px] md:max-w-[500px] absolute right-0 top-[-150px]' src={tree} alt="" />
            <div className='flex flex-col md:flex-row gap-3 max-w-[1440px] mx-auto px-5 md:px-15 py-10'>
                <div className=' bg-white rounded-sm px-3 py-10 mx-auto'>
                    <div className="card bg-base-100 w-96 shadow-sm mx-auto">
                        <figure className='mx-auto'>
                            <img
                                src={image}
                                alt={title} />
                        </figure>
                    </div>
                    <div className="card-body">
                        <h2 className="card-title">{title}</h2>
                        <p>{description}</p>
                        <span>{category}</span>
                        <span>{location}</span>
                        <span>{date}</span>
                        <span>{amount}</span>
                        <div className=" mt-3">
                            <button onClick={handleModal} disabled={!isCurrentMonth} className="btn text-white btn-primary bg-[#CC86F0] hover:bg-[#8C1AC9] border-none">Pay Bill</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog ref={refModal} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Bill Information</h3>

                    <form onSubmit={handleBilling} class="space-y-4">

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Email</label>
                            <input name="email" type="email" readOnly defaultValue={user.email}
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

                        <div class="pt-4">
                            <button type="submit"
                                class="w-full inline-flex justify-center rounded-md text-white bg-[#CC86F0] hover:bg-[#8C1AC9] px-4 py-2 text-white font-medium  disabled:opacity-60"
                            >
                                Pay Bill
                            </button>
                            <p class="text-sm mt-2 text-red-500 hidden"></p>
                        </div>
                    </form>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn text-white bg-[#CC86F0] hover:bg-[#8C1AC9]">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default BillDetails;