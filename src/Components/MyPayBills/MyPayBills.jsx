import React, { use, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import '../../App.css';
import Swal from 'sweetalert2';

const MyPayBills = () => {
    const { user } = use(AuthContext)
    const [bills, setBills] = useState([])
    const [selectedBill, setSelectedBill] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://utility-api-server.vercel.app/usersBills?email=${user.email}`)
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

        fetch(`https://utility-api-server.vercel.app/usersBills/${selectedBill._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedBill)
        })
            .then(res => res.json())
            .then(data => {
                console.log('Updated', data);
                Swal.fire({
                    title: "Bill updated",
                    icon: "success",
                    draggable: true
                });
                refUpdateModal.current.close();
                setBills(prev =>
                    prev.map(b => b._id === selectedBill._id ? { ...b, ...updatedBill } : b)
                );
            })
    }

    const handleDelete = (billId) => {
        if (window.confirm('Are you sure you want to delete this bill?')) {
            fetch(`https://utility-api-server.vercel.app/usersBills/${billId}`, {
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
        <div className='max-w-[1440px] mx-auto'>
            <div className="min-h-screen  py-10">
                <div className="max-w-[1440px] mx-auto px-5">

                    <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">My Paid Bills</h1>
                            <p className="text-gray-500 mt-1 text-sm">You have successfully settled {bills.length} utility payments.</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col min-w-[150px]">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Settled</span>
                                <span className="text-xl font-black">
                                    ৳{bills.reduce((sum, bill) => sum + Number(bill.amount), 0).toLocaleString()}
                                </span>
                            </div>
                            <button
                                onClick={handleDownloadReport}
                                className="bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-100 flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                Download Report
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">SL</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Customer Info</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">Amount</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Contact & Address</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Payment Date</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {bills.map((info, index) => (
                                        <tr key={info._id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-5 text-sm text-gray-400 text-center font-medium">
                                                {String(index + 1).padStart(2, '0')}
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold text-xs">
                                                        {info.username?.slice(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 leading-none">{info.username}</p>
                                                        <p className="text-xs text-gray-400 mt-1">{info.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className="text-sm font-black text-gray-900">৳{info.amount}</span>
                                                <span className="block text-[9px] font-bold text-green-500 uppercase mt-0.5">● Success</span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="text-sm text-gray-600 font-medium">{info.phone}</p>
                                                <p className="text-xs text-gray-400 truncate max-w-[150px]">{info.address}</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="text-sm text-gray-700 font-semibold">{info.date}</p>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleUpdate(info)}
                                                        className="p-2 hover:bg-white rounded-lg text-blue-600 shadow-sm border border-transparent hover:border-gray-100 transition-all"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(info._id)}
                                                        className="p-2 hover:bg-white rounded-lg text-red-500 shadow-sm border border-transparent hover:border-gray-100 transition-all"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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