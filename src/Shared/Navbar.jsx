import { useState } from 'react';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import logo from './../assets/Images/logo.webp'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 sticky-shadow-md shadow">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Left side - Menu Items (PC only) */}
          <div className="hidden md:flex space-x-6 font-josefin">
            <a href="#home" className="text-gray-800 text-xl hover:text-gray-600">Shirts</a>
            <a href="#about" className="text-gray-800 text-xl hover:text-gray-600">Tshirts</a>
            <a href="#services" className="text-gray-800 text-xl hover:text-gray-600">Hoodies</a>
            <a href="#contact" className="text-gray-800 text-xl hover:text-gray-600">Jackets</a>
          </div>
          {/* Mobile menu toggle button */}
          <button
              className="md:hidden text-gray-800 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={36} /> : <FiMenu size={36} />}
            </button>
          {/* Center - Logo */}
          <div className="flex-1 flex justify-center items-center">
            <img src={logo} alt="" className='w-32 xl:mr-40' />
          </div>

          {/* Right side - Search, Cart, User (For both PC and Mobile) */}
          <div className="flex space-x-6 items-center">
            <FiSearch className="text-gray-800" size={30} />
            <FiShoppingCart className="text-gray-800" size={30} />
            <FiUser className="text-gray-800 hidden md:block" size={30} />
            
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-2/3  bg-white h-full shadow-lg z-50 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-5">
          <button className="text-gray-600" onClick={() => setIsMenuOpen(false)}>
            <FiX size={24} />
          </button>

          {/* Mobile Menu Items */}
          <ul className="mt-8 space-y-4 font-josefin">
            <li><a href="#home" className="text-gray-800">Shirts</a></li>
            <li><a href="#about" className="text-gray-800">Tshirts</a></li>
            <li><a href="#services" className="text-gray-800">Hoodies</a></li>
            <li><a href="#contact" className="text-gray-800">Jackets</a></li>
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
  );
};

export default Navbar;
