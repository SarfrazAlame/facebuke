import React from "react";
import NavLinks from "./NavLinks";
import LeftSide from "./LeftSide";
import { CiSearch } from "react-icons/ci";
import { IoReorderThreeOutline } from "react-icons/io5";

const Header = () => {
  return (
    <>
      <div className="h-20 sm:h-14 w-full bg-white shadow-md ">
        <div className="flex sm:justify-between  items-center h-full lg:mx-5">
          <div className="flex">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
              alt="logo"
              width={40}
              className="hidden sm:block"
            />
            <input
              type="text"
              placeholder="Search facebook"
              className="border hidden md:block mx-4 rounded-full px-5 bg-gray-100 
          placeholder:text-neutral-500  outline-none
          "
            />
          </div>

          <div className="w-full">
            <div className="sm:hidden w-full flex justify-between items-center">
              <p className="text-2xl  font-bold text-blue-600 mt-2">facebook</p>
              <div className="flex items-center gap-1 cursor-pointer">
                <CiSearch className="text-3xl font-extrabold bg-gray-100 p-1 rounded-full" />
                <IoReorderThreeOutline className="text-3xl font-extrabold bg-gray-100 p-1 rounded-full" />
              </div>
            </div>
            <div className="w-full">
              <NavLinks />
            </div>
          </div>

          <div className="hidden lg:block">
            <LeftSide />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
