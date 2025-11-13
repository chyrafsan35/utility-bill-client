import React, { use, useEffect, useState } from 'react';
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
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>Rafsan</td>
                                <td>joba@dey.com</td>
                                <td>300</td>
                                <td>new market</td>
                                <td>01815376317</td>
                                <td>12-10-2005</td>
                                <td><button className='btn'>Update</button> <button className='btn'>Delete</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyPayBills;