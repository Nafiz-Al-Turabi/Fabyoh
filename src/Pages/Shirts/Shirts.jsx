import React, { useState } from 'react';
import useBackgroundStyles from '../../Hooks/useBackgroundStyles';
import useTextContent from '../../Hooks/useTextContent';

const Shirts = () => {
    const backgroundStyles = useBackgroundStyles("https://i.ibb.co/0mwWHGc/bg.webp");
    const { title, description } = useTextContent("Shop", "You don't need to approach fashion. Fashion approaches you here.");

    // State to manage dropdown visibility and selected option
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Newest');

    // Handle the dropdown toggle
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Handle selecting an option
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsDropdownOpen(false); // Close dropdown after selecting an option
    };

    return (
        <div className='font-josefin'>
            <div style={backgroundStyles} className='relative'>
                <div className='bg-white max-w-md absolute bottom-0 p-8'>
                    <h1 className='text-4xl font-bold mb-6'>{title}</h1>
                    <p className='text-lg'>{description}</p>
                </div>
            </div>
            <div className='flex justify-between items-center p-6 border-2 bg-white relative'>
                <p>26 Items Found</p>
                <div className='relative'>
                    <span className='w-56 p-2 text-slate-400 border rounded-md flex items-center cursor-pointer' onClick={handleDropdownToggle}>
                        Store by:
                        <button className='text-left text-black ml-2'>{selectedOption}</button>
                    </span>
                    {isDropdownOpen && (
                        <div className='bg-white shadow-md w-56 flex flex-col absolute right-0 top-12 rounded-md z-40 border border-gray-200'>
                            <button
                                className='p-2 hover:bg-violet-50 text-left'
                                onClick={() => handleOptionSelect('Newest')}
                            >
                                Newest
                            </button>
                            <button
                                className='p-2 hover:bg-violet-50 text-left'
                                onClick={() => handleOptionSelect('Low to High')}
                            >
                                Low to High
                            </button>
                            <button
                                className='p-2 hover:bg-violet-50 text-left'
                                onClick={() => handleOptionSelect('High to Low')}
                            >
                                High to Low
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shirts;
