import React, { use, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const MyPayBills = () => {
    const { user } = use(AuthContext)
    const [bills, setBills] = useState([])
    const [selectedBill, setSelectedBill] = useState(null);

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

    const handleUpdate = (bill) => {
        setSelectedBill(bill);
        refUpdateModal.current.showModal();
    }

    const updateBill = (e) => {
        e.preventDefault();
        const amount = e.target.amount.value;
        const address = e.target.address.value;
        const phone = e.target.phone.value;
        const date = e.target.date.value;

        const updatedBill = {
            amount: amount,
            address: address,
            phone: phone,
            date: date
        }

        fetch(`http://localhost:3000/usersBills/${selectedBill._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedBill)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Updated', data)
                refUpdateModal.current.close();
                setBills(prev =>
                    prev.map(b => b._id === selectedBill._id ? { ...b, ...updatedBill } : b)
                );
            })
    }

    const handleDelete = (billId) => {
        if (window.confirm('Are you sure you want to delete this bill?')) {
            fetch(`http://localhost:3000/usersBills/${billId}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setBills(prev => prev.filter(b => b._id !== billId));
                })
        }
    };


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
                                    <td><button onClick={() => handleUpdate(info)} className='btn'>Update</button> <button onClick={() => handleDelete(info._id)} className='btn'>Delete</button></td>
                                </tr>)
                            }
                        </tbody>
                    </table>

                </div>
            </div>
            <dialog ref={refUpdateModal} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Billing Info</h3>

                    {selectedBill && (
                        <form onSubmit={updateBill} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Amount</label>
                                <input name="amount" type="text" className="input input-bordered w-full"
                                    defaultValue={selectedBill.amount} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input name="address" type="text" className="input input-bordered w-full"
                                    defaultValue={selectedBill.address} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input name="phone" type="tel" className="input input-bordered w-full"
                                    defaultValue={selectedBill.phone} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Date</label>
                                <input name="date" type="text" className="input input-bordered w-full"
                                    defaultValue={selectedBill.date} />
                            </div>

                            <div className="modal-action">
                                <button type="submit" className="btn">Update</button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default MyPayBills;