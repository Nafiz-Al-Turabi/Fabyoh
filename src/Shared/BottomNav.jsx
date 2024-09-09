import React from 'react';
import { CiGrid41 } from 'react-icons/ci';
import { FaOpencart } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi';
import { LiaUser } from 'react-icons/lia';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 z-50 md:hidden font-josefin">
      <div className="flex justify-around items-center py-2">
        {/* Home */}
        <div className="flex flex-col items-center text-gray-700">
          <HiOutlineHome  className="text-2xl" />
          <span className="text-xs">Home</span>
        </div>

        {/* Shop */}
        <div className="flex flex-col items-center text-gray-700">
          <CiGrid41 className="text-2xl" />
          <span className="text-xs">Shop</span>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center text-gray-700">
          <LiaUser className="text-2xl" />
          <span className="text-xs">Profile</span>
        </div>

        {/* Cart */}
        <div className="flex flex-col items-center text-gray-700">
          <FaOpencart  className="text-2xl" />
          <span className="text-xs">Cart</span>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
