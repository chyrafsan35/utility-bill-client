import React from 'react';
import { useLoaderData } from 'react-router';

const BillDetails = () => {
    const detailedBill = useLoaderData();
    console.log(detailedBill)
    const { title, category, location, description, image, amount, date } = detailedBill;

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={image}
                    alt={title} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <span>{category}</span>
                <span>{location}</span>
                <span>{date}</span>
                <span>{amount}</span>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Pay Bill</button>
                </div>
            </div>
        </div>
    );
};

export default BillDetails;