import { useEffect, useRef, useState } from 'react';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import logo from './../assets/Images/logo.webp'
import { IoClose, IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { CiGlobe } from 'react-icons/ci';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);


  const toggleSearch = () => {
    setIsSearch(!isSearch)
  }
  const toggleLogin = () => {
    setIsLogin(!isLogin)
  }
  const toggleCart = () => {
    setCartOpen(!isCartOpen)
  }
  // for sticky login
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {
        isSearch ? (
          <div className='flex justify-center p-bg items-center h-20 bg-white sticky top-0 sticky-shadow-md shadow z-50'>
            <div className='w-full lg:w-1/2 px-4 lg:px-0 relative'>
              <input type="text" placeholder='What are you looking for...' className='w-full pl-16 py-4  m border hover:border-gray-700 focus:outline-[#9578ed]' />
              <button onClick={toggleSearch}><IoClose className='text-4xl absolute z-50 top-2.5 right-10 text-slate-500' />  </button>
              <button><IoSearch className='text-3xl absolute z-50 top-3.5 left-5 text-slate-500' />  </button>
            </div>
          </div>
        ) :
          <nav className="bg-white sticky top-0 sticky-shadow-md shadow z-30">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-20 items-center">

                {/* Left side - Menu Items (PC only) */}
                <div className="hidden xl:flex space-x-6 font-josefin">
                  <Link to="/shirts" className="text-gray-800 text-xl hover:text-gray-600">Shirts</Link>
                  <Link to="/tshirts" className="text-gray-800 text-xl hover:text-gray-600">Tshirts</Link>
                  <Link to="/hoodies" className="text-gray-800 text-xl hover:text-gray-600">Hoodies</Link>
                  <Link to="/jackets" className="text-gray-800 text-xl hover:text-gray-600">Jackets</Link>
                </div>
                {/* Mobile menu toggle button */}
                <button
                  className="xl:hidden text-gray-800 focus:outline-none"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <FiX size={36} /> : <FiMenu size={36} />}
                </button>
                {/* Center - Logo */}
                <div className="flex-1 flex justify-center items-center">
                  <img src={logo} alt="" className=' w-28 md:w-32 xl:mr-40' />
                </div>

                {/* Right side - Search, Cart, User (For both PC and Mobile) */}
                <div className="flex space-x-6 items-center">
                  <button><FiSearch onClick={toggleSearch} className="text-gray-800 cursor-pointer" size={30} /></button>
                  <button><CiGlobe className="text-gray-800 cursor-pointer hidden xl:block" size={30} /></button>
                  <button><FiUser onClick={toggleLogin} className="text-gray-800 hidden xl:block" size={30} /></button>
                  <button><FiShoppingCart onClick={toggleCart} className="text-gray-800" size={30} /></button>

                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              className={`fixed top-0 left-0 w-full  bg-white h-full shadow-lg z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out`}
            >
              <div className="p-5">
                <div>
                  <img src={logo} alt="" className='w-24' />
                </div>
                <button className="text-gray-600 absolute top-6 right-5" onClick={() => setIsMenuOpen(false)}>
                  <FiX size={24} />
                </button>

                {/* Mobile Menu Items */}
                <ul className="mt-16 space-y-12 font-josefin">
                  <li><a href="#about" className="text-xl">Shop</a></li>
                  <li>
                    {/* Dropdown Menu for Category */}
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                      <span className="text-xl">Categories</span>
                      <FiChevronDown size={20} className={`${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                    </div>
                    {/* Dropdown Items */}
                    {isDropdownOpen && (
                      <ul className="mt-2 ml-4 space-y-8">
                        <li><Link to="/shirts" className="text-xl">Shirts</Link></li>
                        <li><Link to="/tshirts" className="text-xl">Tshirts</Link></li>
                        <li><Link to="/hoodies" className="text-xl">Hoodies</Link></li>
                        <li><Link to="/jackets" className="text-xl">Jackets</Link></li>
                      </ul>
                    )}
                  </li>
                  <li><Link to="/profile" className="text-xl">Profile</Link></li>
                  <li><Link to="/wishlist" className="text-xl">Wishlist</Link></li>
                  <li><Link to="/help" className="text-xl">Help</Link></li>
                  <li><Link to="/login" className="text-xl">Login</Link></li>
                </ul>
              </div>
            </div>

            {/* Overlay for mobile */}
            {isMenuOpen && (
              <div
                className="fixed  inset-0 bg-gray-900 bg-opacity-5 z-40"
                onClick={() => setIsMenuOpen(false)}
              />
            )}
          </nav>
      }
      {
        isLogin && (
          <>
            {/* Background Layer with opacity */}
            <div onClick={toggleLogin} className="fixed inset-0 bg-black bg-opacity-0 z-30"></div>
            <div
              className={`hidden xl:block p-5 ${isSticky ? 'w-64 fixed top-20 right-4 border' : 'w-64 fixed right-4'} z-50 bg-white  mt-2 rounded-lg font-josefin shadow-lg`}
            >
              <div></div>
              <h1 className="text-xl font-bold mb-12">Want To Shop</h1>
              <Link to='/login' onClick={toggleLogin} className="p-btn w-40 py-3 border uppercase hover:bg-[#2b2b2b] hover:text-white duration-100 ease-out">
                Login to start
              </Link>
            </div>
          </>
        )
      }

      {
        isCartOpen && (
          <>
            <div className='fixed z-50 bg-white w-[450px] h-full top-0 right-0 font-josefin '>
              <div className='relative px-6 '>
                <button onClick={toggleCart}>
                  <IoClose className='text-4xl absolute top-5 left-5 text-gray-500' />
                </button>
                <div>
                  <h1 className='text-center mt-16 mb-10'>Yay! No Shipping fees on this order 2</h1>
                {/* cart Card */}
                  <div className='flex  gap-3 border-b pb-6 mb-5'>
                    <div>
                      <img src="https://i.ibb.co.com/47y7qgp/women-p-jacket.webp" alt="" className='w-24 h-24 object-cover' />
                    </div>
                    <div className='space-y-1.5 '>
                      <h3>Fabyoh Premium Hoodies</h3>
                      <p>Color/L</p>
                      <p className='w-24 flex justify-between border-2 p-1 text-center  '>
                        <button>-</button>
                        5
                        <button>+</button></p>
                    </div>
                  </div>
                    <button className='p-btn border mt-5'>Add More From Wishlist</button>

                    <div className='mt-5 p-2'>
                      <h1 className='text-lg'>Total MRP</h1>
                        <div className='flex justify-between bg-gray-100 p-2 mt-2'>
                          <p>Total Amount</p>
                          <p>$250</p>
                        </div>
                    </div>

                    <button className='p-btn s-bg text-white uppercase mt-10'>Proceed to checkout</button>
                    <button className='p-btn hover:bg-[#2b2b2b] border hover:text-white uppercase mt-10 '>View cart</button>
                </div>
              </div>
            </div>
          </>
        )
      }
    </>
  );
};

export default Navbar;
