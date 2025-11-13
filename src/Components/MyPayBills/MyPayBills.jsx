import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const MyPayBills = () => {
    const {user} = use(AuthContext)
    const [bills, setBills] = useState([])

    useEffect(()=>{
        if(user?.email){
            fetch(`http://localhost:3000/usersBills?email=${user.email}`)
            .then(res=>res.json())
            .then(data=>{
                console.log('User data', data)
                setBills(data)
            })
        }
    },[user?.email])

    return (
        <div>
            <p>My Pay Bills : {bills.length}</p>
        </div>
    );
};

export default MyPayBills;