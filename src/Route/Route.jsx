import React from 'react';
import { createBrowserRouter } from "react-router";import Root from '../Components/Root/Root';
import Home from '../Components/Home/Home';
import Bills from '../Components/Bills/Bills';
import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';
import MyPayBills from '../Components/MyPayBills/MyPayBills';
import BillDetails from '../Components/BillDetails/BillDetails';
import PrivateRoute from './PrivateRoute';
import NotFound from '../Components/NotFound/NotFound';
import AboutUs from '../Components/AboutUs/AboutUs';
import Contact from '../Components/Contact/Contact';
import Help from '../Components/Help/Help';
import Feedback from '../Components/Feedback/Feedback';
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
            path : '/about-us',
            Component : AboutUs
        },
        {
            path : '/contact',
            Component : Contact
        },
        {
            path : '/help',
            Component : Help
        },
        {
            path : '/feedback',
            Component : Feedback
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
            element : <PrivateRoute>
                <MyPayBills></MyPayBills>
            </PrivateRoute>
        },
        {
            path : '/billDetails/:id',
            loader : ({params})=>fetch(`https://utility-api-server.vercel.app/bills/${params.id}`),
            element : 
                <BillDetails></BillDetails>
        },
        {
            path : '*',
            element : <NotFound></NotFound>
        }
    ]
  }
]);

export default router;