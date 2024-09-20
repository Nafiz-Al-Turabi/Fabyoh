import React from 'react';

const TransactionCard = ({ transaction }) => {
    const {
        email,
        price,
        date,
        transactionId,
        title,
        size,
        color,
        totalItems,
        image,
        status,
    } = transaction;

    return (
        <div className="lg:flex justify-between gap-5  bg-white shadow-md rounded-lg p-6 max-w-7xl border-t-4 border-violet-500 mx-auto my-4 ">
            <div>
                <h2 className="text-lg font-semibold mb-2">Transaction ID: {transactionId}</h2>
                <p className="text-base text-gray-500">Email: {email}</p>
                <p className="text-base text-gray-500">Date: {new Date(date).toLocaleString()}</p>
                <p className="text-base text-gray-500">Status:
                    <span className={`font-semibold ${status === 'pending' ? 'text-yellow-500' : 'text-green-500'}`}> {status}</span>
                </p>
                <p className="text-base font-semibold text-gray-800 mt-2">Total Price: ${price}</p>
            </div>

            <div className=" mt-4 lg:mt-0">
                {title.map((item, index) => (
                    <div key={index} className="flex items-center border-b py-2">
                        <img
                            src={image[index]}
                            alt={item}
                            className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div className="flex-1">
                            <h3 className="text-md font-semibold">{item}</h3>
                            <p className="text-sm text-gray-500">Size: {size[index]}</p>
                            <p className="text-sm text-gray-500">
                                Color: <span style={{ backgroundColor: color[index] }} className="inline-block w-4 h-4 rounded-full border mr-1"></span> {color[index]}
                            </p>
                            <p className="text-sm text-gray-500">Quantity: {totalItems[index]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionCard;
