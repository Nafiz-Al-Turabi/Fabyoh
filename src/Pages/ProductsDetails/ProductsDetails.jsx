import React, { useContext, useEffect, useState } from 'react';
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../../Provider/CartProvider';
import { AuthContext } from '../../Provider/AuthProvider';
import axiosInstance from '../../Axios/axiosInstance';
import Loading from '../../Components/Loading/Loading';

const ProductsDetails = () => {
    const { user } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [itemCount, setItemCount] = useState(1);
    const { id } = useParams();
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState('');

    const navigate = useNavigate();

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    const handleAddToCart = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (!selectedSize || !selectedColor) {
            setNotification('Please select size and color.');
            return;
        }

        const cartItem = {
            title: details.title,
            color: selectedColor,
            size: selectedSize,
            price: details.price,
            totalItems: itemCount,
            image: details.imageMain,
            totalPrice: details.price * itemCount,
        };
        addToCart(cartItem);
        setNotification('Item added to cart!');
    };

    // Notification
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleItemCountChange = (delta) => {
        setItemCount(prev => Math.max(1, prev + delta));
    };


    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/products/${id}`);

            setDetails(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;

    const { title, colors = [], imageMain, imageSecond, price, description } = details;
    // console.log('this is detail',details);

    return (
        <div className='lg:my-10 font-josefin'>
            {notification && (
                <div className="fixed md:bottom-5 md:right-5 z-50 bg-violet-500 text-white p-1 rounded transition-transform transform scale-105">
                    {notification}
                </div>
            )}
            <div className='xl:flex p-4 xl:p-6 gap-6'>
                <div className='flex xl:w-1/2 gap-1'>
                    <div className='overflow-hidden'>
                        <img src={imageMain} alt={`${title} main`} className='object-cover hover:scale-125 cursor-zoom-in duration-300' />
                    </div>
                    <div className='overflow-hidden'>
                        <img src={imageSecond} alt={`${title} secondary`} className='object-cover hover:scale-125 cursor-zoom-in duration-300' />
                    </div>
                </div>
                <div className='flex flex-col justify-between xl:w-1/2 mt-16 xl:mt-0'>
                    <div>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-2xl lg:text-4xl'>{title}</h1>
                            <button className="hidden lg:block text-4xl p-bg p-1 text-white rounded hover:bg-violet-400 duration-100">
                                <PiHeartStraightLight />
                            </button>
                        </div>
                        <div className='flex gap-5 mt-5'>
                            <p className='text-gray-500'>Size:</p>
                            <div className='flex gap-2 items-center'>
                                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => handleSizeSelect(size)}
                                        className={`flex justify-center items-center p-1 h-6 border rounded-sm ${selectedSize === size ? 'p-bg text-white' : ''}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='flex gap-2 items-center mt-5'>
                            <h1 className='text-gray-500'>Color:</h1>
                            <div className='flex gap-2'>
                                {colors.map(color => (
                                    <div
                                        key={color}
                                        onClick={() => handleColorSelect(color)}
                                        className={`w-6 h-6 rounded-full border border-gray-300 cursor-pointer ${selectedColor === color ? 'ring-2 ring-offset-2 ring-violet-500' : ''}`}
                                        style={{ backgroundColor: color }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                        <div className='flex gap-2 items-center mt-5'>
                            <h1 className='text-gray-500'>Price:</h1>
                            <p className='font-bold'>${price}</p>
                        </div>

                        <p className='w-24 flex justify-between border-2 p-1 text-center'>
                            <button onClick={() => handleItemCountChange(-1)}>-</button>
                            {itemCount}
                            <button onClick={() => handleItemCountChange(1)}>+</button>
                        </p>

                        <p className='text-lg mt-6'>{description}</p>
                    </div>
                    <div className='flex justify-between mt-16 items-center gap-5'>
                        <button
                            className='p-btn text-sm lg:text-2xl uppercase s-bg text-white'
                            onClick={handleAddToCart}
                        >
                            Add to cart
                        </button>
                        <button className='p-btn text-sm lg:text-2xl uppercase border'>
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsDetails;
