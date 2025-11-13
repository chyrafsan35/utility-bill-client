import React, { use, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const MyPayBills = () => {
    const { user } = use(AuthContext)
    const [bills, setBills] = useState([])

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/usersBills?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log('User data', data)
                    setBills(data)
                })
        }
    }, [user?.email])

    const refUpdateModal = useRef();

    const updateBill = (e) => {
        e.preventDefault();
         const amount = e.target.amount.value;
        const address = e.target.address.value;
        const phone = e.target.phone.value;
        const date = e.target.date.value;

        const updatedBill = {
            amount : amount,
            address : address,
            phone : phone,
            date : date
        }

        fetch(`http://localhost:3000/usersBills?email=${user.email}`, {
            method : 'PATCH',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(updatedBill)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('Updated', data)
        })
    }

    const handleUpdate = () => {
        refUpdateModal.current.showModal();
    }

    return (
        <div>
            <p>My Pay Bills : {bills.length}</p>
            <div className='max-w-[1440px] mx-auto p-5'>
                <div className="overflow-x-auto rounded-box border border-gray-400 bg-base-100">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SL No.</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Amount</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bills.map((info, index) => <tr key={info._id}>
                                    <th>{index + 1}</th>
                                    <td>{info.username}</td>
                                    <td>{info.email}</td>
                                    <td>{info.amount}</td>
                                    <td>{info.address}</td>
                                    <td>{info.phone}</td>
                                    <td>{info.date}</td>
                                    <td><button onClick={handleUpdate} className='btn'>Update</button> <button className='btn'>Delete</button></td>
                                    <dialog ref={refUpdateModal} className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Update Billing Info</h3>

                                            <form onSubmit={updateBill} class="space-y-4">

                                                <div>
                                                    <label class="block text-sm font-medium text-gray-700">Amount</label>
                                                    <div class="mt-1 relative rounded-md shadow-sm">
                                                        <input name="amount" type="text" 
                                                            class="block w-full pr-12 rounded-md border-gray-200 bg-gray-100 p-2"
                                                            defaultValue={info.amount} />
                                                        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">

                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label class="block text-sm font-medium text-gray-700">Address</label>
                                                    <input name="address" type="text"
                                                        class="mt-1 border block w-full rounded-md border-gray-300 p-2"
                                                        defaultValue={info.address} />
                                                </div>

                                                <div>
                                                    <label class="block text-sm font-medium text-gray-700">Phone</label>
                                                    <input name="phone" type="tel" required
                                                        pattern="^\+?\d{8,15}$"
                                                        title="Enter a valid phone number (8–15 digits, optional leading +)"
                                                        class="mt-1 border block w-full rounded-md border-gray-300 p-2"
                                                        defaultValue={info.phone} />

                                                </div>

                                                <div>
                                                    <label class="block text-sm font-medium text-gray-700">Date</label>
                                                    <input name="date" type="text"
                                                        class="mt-1 block w-full rounded-md border-gray-200 bg-gray-100 p-2"
                                                        defaultValue={info.date} />
                                                </div>
                                            </form>

                                            <div className="modal-action">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn">Update</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </tr>)
                            }
                        </tbody>
                    </table>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}


                </div>
            </div>
        </div>
    );
};

export default MyPayBills;