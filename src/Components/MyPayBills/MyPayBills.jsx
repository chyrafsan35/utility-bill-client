import React, { use, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import jsPDF from "jspdf";
import autoTable from "jspdf-auTotable";
import '../../App.css';
import tree from '../../assets/tree-branch.png';

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

    const totalBills = bills.length;
    const totalAmount = bills.reduce((sum, bill) => sum + Number(bill.amount), 0);

    const handleDownloadReport = () => {
        if (!bills || totalBills === 0) {
            alert("No bills to download");
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("My Bills Report", 14, 22);

        autoTable(doc, {
            head: [["SL", "Username", "Email", "Amount", "Address", "Phone", "Date"]],
            body: bills.map((bill, index) => [
                index + 1,
                bill.username,
                bill.email,
                bill.amount,
                bill.address,
                bill.phone,
                bill.date
            ]),
            startY: 30
        });

        doc.text(`Total Bills: ${bills.length}`, 14, doc.lastAutoTable.finalY + 10);
        doc.text(`Total Amount: ৳${totalAmount.toLocaleString()}`, 14, doc.lastAutoTable.finalY + 20);
        doc.save("My_Bills_Report.pdf");

    }


    return (
        <div className='bg-gradient-to-r from-[#8FC6FF] to-[#007BFF] relative overflow-hidden'>
            <img className='max-w-[300px] md:max-w-[500px] absolute right-0 top-[-150px]' src={tree} alt="" />
            <p className='common_p mt-10'> My Pay Bills : {bills.length}</p>
            <div className="max-w-[1440px] mx-auto p-5">
                <div className="overflow-x-auto">
                    <table className=".com_text table table-auto min-w-full border border-gray-400 bg-base-100">
                        <thead className="bg-gray-200">
                            <tr className='.com_text'>
                                <th className="p-2 text-left">SL No.</th>
                                <th className="p-2 text-left">Username</th>
                                <th className="p-2 text-left">Email</th>
                                <th className="p-2 text-left">Amount</th>
                                <th className="p-2 text-left">Address</th>
                                <th className="p-2 text-left">Phone</th>
                                <th className="p-2 text-left">Date</th>
                                <th className="p-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map((info, index) => (
                                <tr key={info._id} className="border-t">
                                    <td className="p-2">{index + 1}</td>
                                    <td className="p-2">{info.username}</td>
                                    <td className="p-2">{info.email}</td>
                                    <td className="p-2">{info.amount}</td>
                                    <td className="p-2">{info.address}</td>
                                    <td className="p-2">{info.phone}</td>
                                    <td className="p-2">{info.date}</td>
                                    <td className="p-2 space-x-2">
                                        <button onClick={() => handleUpdate(info)} className="btn btn-soft btn-accent">Update</button>
                                        <button onClick={() => handleDelete(info._id)} className="btn btn-soft btn-error">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mb-4 flex justify-between items-center mt-5">
                        <div>
                            <span>Total Bills Paid: {bills.length}</span>
                            <span className="ml-4">Total Amount: ৳{bills.reduce((sum, bill) => sum + Number(bill.amount), 0).toLocaleString()}</span>
                        </div>
                        <button onClick={handleDownloadReport} className="btn border-none text-white bg-[#8FC6FF] hover:bg-[#007BFF]">Download Report</button>
                    </div>
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