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

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  function logOut() {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  }

  return (
    <header className="flex items-center justify-between py-5 font-medium">
      <span onClick={() => navigate("/")}>
        <img
          className="w-[110px] cursor-pointer"
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
          <div onClick={() => (token ? null : navigate("/login"))}>
            <BiUser className="w-6 h-6 text-gray-700 hover:text-lightPink transition-colors duration-300 cursor-pointer" />
          </div>
          {token && (
            <div className="absolute right-0 pt-3 hidden group-hover:block dropdown-menu z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
              <div className="w-48 py-4 px-5 bg-white rounded-xl shadow-lg border border-gray-100 text-gray-700 flex flex-col gap-3">
                <p
                  onClick={() => navigate("/profile")}
                  className="text-base font-medium hover:text-chocolateBrown transition-colors duration-200 cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="text-base font-medium hover:text-chocolateBrown transition-colors duration-200 cursor-pointer"
                >
                  Orders
                </p>
                <p
                  onClick={logOut}
                  className="text-base font-medium hover:text-chocolateBrown transition-colors duration-200 cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <HiOutlineShoppingBag className="w-5.5 h-5.5" />
          {counter >= 1 && (
            <p className="absolute right-[-5px] top-[9px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">
              {getCartCount()}
            </p>
          )}
        </Link>
        <BiMenuAltRight
          onClick={() => setVisible(true)}
          className="w-7 h-7 cursor-pointer sm:hidden"
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`fixed z-[1000] top-0 left-0 h-screen bg-gradient-to-br from-martianRed to-darkRed shadow-lg transform transition-transform duration-300 ease-in-out ${
          visible ? "translate-x-0" : "-translate-x-full"
        } w-3/4`}
      >
        <div className="flex flex-col h-full text-gray-100">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-martianRed to-darkRed border-b border-gray-400/30">
            <span className="text-lg font-semibold text-white">Menu</span>
            <FaAngleLeft
              onClick={() => setVisible(false)}
              className="w-6 h-6 text-gray-200 cursor-pointer hover:text-white transition-colors duration-200"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col gap-2 p-4">
            <NavLink
              onClick={() => setVisible(false)}
              to="/"
              className={({ isActive }) =>
                `py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-200 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/shop"
              className={({ isActive }) =>
                `py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-200 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/contact"
              className={({ isActive }) =>
                `py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-200 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              to="/about"
              className={({ isActive }) =>
                `py-3 px-4 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-200 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              About
            </NavLink>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-400/30">
            <p className="text-sm text-gray-300">© 2025 Martian Horse</p>
          </div>
        </div>
      </div>

      {/* Overlay with blur effect */}
      {visible && (
        <div
          onClick={() => setVisible(false)}
          className="fixed inset-0 bg-transparent bg-opacity-40 backdrop-blur-sm z-[999] sm:hidden transition-all duration-300"
        />
      )}
    </header>
  );
};

export default Navbar;
