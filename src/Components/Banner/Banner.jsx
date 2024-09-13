import React, { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported

import image12 from './../../assets/images/slider/image12.jpg';
import image8 from './../../assets/images/slider/image8.jpg';
import image9 from './../../assets/images/slider/image9.jpg';
import image10 from './../../assets/images/slider/image10.jpg';
import image11 from './../../assets/images/slider/image11.jpg';
import image4 from './../../assets/images/slider/image4.jpg';
import image5 from './../../assets/images/slider/image5.jpg';
import image6 from './../../assets/images/slider/image6.jpg';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

const CustomSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isHovering, setIsHovering] = useState(false);
    const slideIntervalRef = useRef(null);

    const imagesDesktop = [image12, image8, image9,image10,image11];
    const imagesMobile = [image4, image5, image6];

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const imagesToShow = isMobile ? imagesMobile : imagesDesktop;
        const totalImages = imagesToShow.length;

        if (isHovering) return; // Stop autoplay if hovering

        slideIntervalRef.current = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % (totalImages + 1));
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(slideIntervalRef.current);
    }, [isMobile, isHovering]);

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % ((isMobile ? imagesMobile.length : imagesDesktop.length) + 1));
    };

    const handlePrev = () => {
        setCurrentSlide((prevSlide) =>
            (prevSlide - 1 + ((isMobile ? imagesMobile.length : imagesDesktop.length) + 1)) % ((isMobile ? imagesMobile.length : imagesDesktop.length) + 1)
        );
    };

    const imagesToShow = isMobile ? [...imagesMobile, imagesMobile[0]] : [...imagesDesktop, imagesDesktop[0]];

    return (
        <div
            className="relative w-full overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            
            <div className="relative">
                <div
                    className="flex transition-transform duration-500"
                    style={{
                        transform: `translateX(-${(currentSlide % (isMobile ? imagesMobile.length : imagesDesktop.length)) * 100}%)`,
                    }}
                >
                    {imagesToShow.map((image, index) => (
                        <div key={index} className="min-w-full xl:h-[780px] overflow-hidden">
                            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-[100%] object-cover" />
                        </div>
                    ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
                    <button
                        className=" p-text p-2 rounded-full pointer-events-auto"
                        onClick={handlePrev}
                    >
                        <MdArrowBackIosNew className='text-3xl lg:text-5xl'/>
                    </button>
                    <button
                        className=" p-text p-2 rounded-full pointer-events-auto"
                        onClick={handleNext}
                    >
                       <MdArrowForwardIos className='text-3xl lg:text-5xl' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomSlider;
