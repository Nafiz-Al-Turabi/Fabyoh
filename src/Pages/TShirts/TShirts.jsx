import React from 'react';
import useBackgroundStyles from '../../Hooks/useBackgroundStyles';
import useTextContent from '../../Hooks/useTextContent';
import Filters from '../../Components/Filters/Filters';

const TShirts = () => {
    const backgroundStyles = useBackgroundStyles("https://i.ibb.co.com/xgpNZYC/fgffg.jpg");
    const { title, description } = useTextContent("Shop", "You don't need to approach fashion. Fashion approaches you here.");
    return (
        <div>
            <div style={backgroundStyles} className='relative font-josefin'>
                <div className='bg-white max-w-md absolute bottom-0 p-4 xl:p-8 '>
                    <h1 className='text-4xl font-bold mb-6'>{title}</h1>
                    <p className='text-lg'>{description}</p>
                </div>
            </div>
            <Filters />
        </div>
    );
};

export default TShirts;