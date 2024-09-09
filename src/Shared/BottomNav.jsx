import React from 'react';
import { CiGrid41 } from 'react-icons/ci';
import { FaOpencart } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi';
import { LiaUser } from 'react-icons/lia';
import ActiveBottomNav from '../ActiveLinks/ActiveBottomNav';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white bottom-shadow z-50 md:hidden font-josefin">
      <div className="flex justify-around items-center py-2">
        {/* Home */}
        <ActiveBottomNav to='/' className="flex flex-col gap-3 items-center p-text ">
          <HiOutlineHome  className="text-3xl" />
          <span className="font-[300] ">Home</span>
        </ActiveBottomNav>

        {/* Shop */}
        <ActiveBottomNav to='/shop' className="flex flex-col items-center ">
          <CiGrid41 className="text-3xl" />
          <span className="font-[300]">Shop</span>
        </ActiveBottomNav>

        {/* Profile */}
        <ActiveBottomNav to='/profile' className="flex flex-col items-center ">
          <LiaUser className="text-3xl" />
          <span className="font-[300]">Profile</span>
        </ActiveBottomNav>

        {/* Cart */}
        <ActiveBottomNav to='/cart' className="flex flex-col items-center ">
          <FaOpencart  className="text-3xl" />
          <span className="font-[300]">Cart</span>
        </ActiveBottomNav>
      </div>
    </div>
  );
};

export default BottomNav;
