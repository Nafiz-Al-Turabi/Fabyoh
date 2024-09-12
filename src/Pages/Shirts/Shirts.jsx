import React, { useEffect, useState } from 'react';
import useBackgroundStyles from '../../Hooks/useBackgroundStyles';
import useTextContent from '../../Hooks/useTextContent';
import Filters from '../../Components/Filters/Filters';

const Shirts = () => {
    const backgroundStyles = useBackgroundStyles("https://i.ibb.co/0mwWHGc/bg.webp");
    const { title, description } = useTextContent("Shop Shirts", "You don't need to approach fashion. Fashion approaches you here.");

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='font-josefin'>
            <div style={backgroundStyles} className='relative'>
                <div className='bg-white max-w-md absolute bottom-0 p-4 xl:p-8'>
                    <h1 className='text-4xl font-bold mb-6'>{title}</h1>
                    <p className='text-lg'>{description}</p>
                </div>
            </div>
            <Filters />
        </div>
    );
};

export default Shirts;
