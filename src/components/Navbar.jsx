import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { BiMenuAltRight } from "react-icons/bi";
import { FaAngleLeft } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const { counter } = useContext(ShopContext);

  const { setShowSearch, getCartCount } = useContext(ShopContext);

  return (
    <header className="flex items-center justify-between py-5 font-medium">
      <span>
        <img
          className="w-[110px] cursor-pointer "
          src="/images/logo.png"
          alt="logo"
        />
      </span>
      <ul className="hidden sm:flex gap-5 text-[16px] text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/shop" className="flex flex-col items-center gap-1">
          <p>Shop</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <div onClick={() => setShowSearch(true)}>
          <RiSearchLine className="w-5.5 h-5.5 cursor-pointer hover:text-lightPink duration-500" />
        </div>

        <div className="group relative">
          <Link to="/login">
            <BiUser className="w-5.5 h-5.5 cursor-pointer hover:text-lightPink duration-500" />
          </Link>

          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-1000">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <HiOutlineShoppingBag className="w-5.5 h-5.5" />
          {counter >= 1 && (
            <p className="absolute right-[-5px] top-[9px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px] ">
              {getCartCount()}
            </p>
          )}
        </Link>
        <BiMenuAltRight
          onClick={() => setVisible(true)}
          className="w-7 h-7 cursor-pointer sm:hidden"
        />
      </div>
      {/* sidebar menu for small screens*/}
      <div
        className={`absolute z-1000 top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <FaAngleLeft className="h-4 w-4" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 hover:text-black transition-all duration-300"
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 hover:text-black transition-all duration-300"
            to="/shop"
          >
            Shop
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 hover:text-black transition-all duration-300"
            to="/contact"
          >
            Contact
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 hover:text-black transition-all duration-300"
            to="/about"
          >
            About
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
