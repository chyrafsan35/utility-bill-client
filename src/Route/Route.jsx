import React from 'react';
import { createBrowserRouter } from "react-router";import Root from '../Components/Root/Root';
import Home from '../Components/Home/Home';
import Bills from '../Components/Bills/Bills';
import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';
import MyPayBills from '../Components/MyPayBills/MyPayBills';
import BillDetails from '../Components/BillDetails/BillDetails';
import PrivateRoute from './PrivateRoute';
;

const router = createBrowserRouter([
  {
    path: "/",
    Component : Root,
    children : [
        {
            index : true,
            Component : Home
        },
        {
            path : '/bills',
            Component : Bills
        },
        {
            path : '/login',
            Component : Login
        },
        {
            path : '/register',
            Component : Register
        },
        {
            path : '/myPayBills',
            Component : MyPayBills
        },
        {
            path : '/billDetails/:id',
            loader : ({params})=>fetch(`http://localhost:3000/bills/${params.id}`),
            element : <PrivateRoute>
                <BillDetails></BillDetails>
            </PrivateRoute>
        },
    ]
  }
]);

export default router;