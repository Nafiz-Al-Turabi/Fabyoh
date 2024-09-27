import React, { useContext, useEffect, useState } from 'react';
import { CiGrid41 } from 'react-icons/ci';
import { FaOpencart } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi';
import { LiaUser } from 'react-icons/lia';
import ActiveBottomNav from '../ActiveLinks/ActiveBottomNav';
import { AuthContext } from '../Provider/AuthProvider';
import axiosInstance from '../Axios/axiosInstance';

const BottomNav = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

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
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white bottom-shadow z-50 md:hidden font-josefin">
      <div className="flex justify-around items-center py-2">
        {/* Home */}
        <ActiveBottomNav to='/' className="flex flex-col gap-3 items-center p-text ">
          <HiOutlineHome className="text-3xl" />
          <span className="font-[300] ">Home</span>
        </ActiveBottomNav>

        {/* Shop */}
        <ActiveBottomNav to='/shop' className="flex flex-col items-center ">
          <CiGrid41 className="text-3xl" />
          <span className="font-[300]">Shop</span>
        </ActiveBottomNav>

        {/* Profile */}
        {
          userInfo ?
            <ActiveBottomNav to='/dashboard' className="flex flex-col items-center ">
              <LiaUser className="text-3xl" />
              <span className="font-[300]">Profile</span>
            </ActiveBottomNav>
            :
            <ActiveBottomNav to='/login' className="flex flex-col items-center ">
              <LiaUser className="text-3xl" />
              <span className="font-[300]">Profile</span>
            </ActiveBottomNav>
        }

        {/* Cart */}
        <ActiveBottomNav to='/cart' className="flex flex-col items-center ">
          <FaOpencart className="text-3xl" />
          <span className="font-[300]">Cart</span>
        </ActiveBottomNav>
      </div>
    </div>
  );
};

export default BottomNav;
