import { useContext, useEffect, useRef, useState } from 'react';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import logo from './../assets/Images/logo.webp'
import { IoClose, IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { TbHeartFilled } from "react-icons/tb";
import ActiveLink from '../ActiveLinks/ActiveLink';
import Sidebar from '../Components/Sidebar/Sidebar';
import { CartContext } from '../Provider/CartProvider';
import { Result } from 'postcss';
import axiosInstance from '../Axios/axiosInstance';
import { AuthContext } from '../Provider/AuthProvider';
import { FcBusinessman } from 'react-icons/fc';
import Loading from '../Components/Loading/Loading';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const { user, loading } = useContext(AuthContext);



  const toggleSearch = () => {
    setIsSearch(!isSearch)
    setSearchTerm(''); // Reset the search input when closing
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

  useEffect(() => {
    fetchProducts();
    fetchUserInfo();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products')
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Search system....
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); // Clear when searchTerm is empty
    }
  }, [searchTerm, products]);


  // User info
  useEffect(() => {
    fetchUserInfo();
  }, [user]);

  const fetchUserInfo = async () => {
    const authtoken = localStorage.getItem('authToken');

    if (!authtoken) {
      console.error("No auth token found.");
      return;
    }
    try {
      const response = await axiosInstance.get('/userinfo', {
        headers: {
          'Authorization': `Bearer ${authtoken}`
        }
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info", error);
    }
  };
  
  const  wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];


  if (loading) return <Loading></Loading>;
  

  return (
    <>
      {
        isSearch ? (
          <div className='flex justify-center items-center h-20 bg-white sticky top-0 shadow z-50 font-josefin'>
            <div className='w-full lg:w-1/2 px-4 lg:px-0 relative'>
              <input
                type="text"
                placeholder='What are you looking for...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-16 py-4 m border hover:border-gray-700 focus:outline-violet-500'
              />
              <button onClick={toggleSearch}>
                <IoClose className='text-4xl absolute z-50 top-2.5 right-10 text-slate-500' />
              </button>
              <button>
                <IoSearch className='text-3xl absolute z-50 top-3.5 left-5 text-slate-500' />
              </button>
            </div>

            <div className='w-full lg:w-1/2 absolute top-20 z-40 bg-white p-4 rounded-b-md shadow-md'>
              {searchTerm.trim() === '' ? (
                <p>Type something...</p>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div key={product.id} className='p-1 hover:bg-violet-200'>
                    <Link onClick={toggleSearch} to={`/productDetails/${product._id}`}>{product.title}</Link>
                  </div>
                ))
              ) : (
                <p>No results found</p>
              )}
            </div>
          </div>

        ) :
          <nav className="bg-white sticky top-0 sticky-shadow-md shadow z-30">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-20 items-center">

                {/* Left side - Menu Items (PC only) */}
                <div className="hidden xl:flex space-x-6 font-josefin">
                  <ActiveLink to="/shirts" >Shirts</ActiveLink>
                  <ActiveLink to="/tshirts" >Tshirts</ActiveLink>
                  <ActiveLink to="/hoodies" >Hoodies</ActiveLink>
                  <ActiveLink to="/jackets" >Jackets</ActiveLink>
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
                  <Link to='/'>
                    <img src={logo} alt="" className=' w-28 md:w-32 xl:mr-40' />
                  </Link>
                </div>

                {/* Right side - Search, Cart, User (For both PC and Mobile) */}
                <div className="flex space-x-6 items-center">
                  <button><FiSearch onClick={toggleSearch} className="text-gray-800 cursor-pointer" size={30} /></button>
                  {/* <button><CiGlobe className="text-gray-800 cursor-pointer hidden xl:block" size={30} /></button> */}
                  {
                    userInfo ? (<div>
                      <Link to='/dashboard'><FcBusinessman className='' size={30} /></Link>
                    </div>)
                      : <button><FiUser onClick={toggleLogin} className="text-gray-800 hidden xl:block" size={30} /></button>
                  }
                  <div className='relative'>
                    <button><FiShoppingCart onClick={toggleCart} className="text-gray-800" size={30} /></button>
                    <p className='w-4 h-4 s-bg text-white text-xs flex justify-center items-center rounded-full absolute -top-1 -right-1.5 '>{cartItems?.length}</p>
                  </div>
                  <div className='relative'>
                    <Link to='wishlist'><TbHeartFilled className="text-violet-800" size={30} /></Link>
                    <p className='w-4 h-4 s-bg text-white text-xs flex justify-center items-center rounded-full absolute -top-1 -right-1.5 '>{wishlist?.length}</p>
                  </div>

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
                  <li><ActiveLink to="/">Shop</ActiveLink></li>
                  <li>
                    {/* Dropdown Menu for Category */}
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                      <span className="text-xl">Categories</span>
                      <FiChevronDown size={20} className={`${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                    </div>
                    {/* Dropdown Items */}
                    {isDropdownOpen && (
                      <ul className="mt-2 ml-4 space-y-8">
                        <li><ActiveLink to="/shirts">Shirts</ActiveLink></li>
                        <li><ActiveLink to="/tshirts">Tshirts</ActiveLink></li>
                        <li><ActiveLink to="/hoodies">Hoodies</ActiveLink></li>
                        <li><ActiveLink to="/jackets">Jackets</ActiveLink></li>
                      </ul>
                    )}
                  </li>
                  <li><ActiveLink to="/profile">Profile</ActiveLink></li>
                  <li><ActiveLink to="/wishlist">Wishlist</ActiveLink></li>
                  <li><ActiveLink to="/help">Help</ActiveLink></li>
                  <li><ActiveLink to="/login">Login</ActiveLink></li>
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
            <div className='fixed inset-0 bg-black bg-opacity-50 z-40' onClick={toggleCart}></div>
            <Sidebar toggleCart={toggleCart} />
          </>
        )
      }
    </>
  );
};

export default Navbar;
