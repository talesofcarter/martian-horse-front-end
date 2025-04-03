import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { BiUser } from "react-icons/bi";
import { BiMenuAltRight } from "react-icons/bi";
import { FaAngleLeft } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import {
  IoHomeOutline,
  IoStorefrontOutline,
  IoMailOutline,
  IoInformationCircleOutline,
  IoCartOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

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

  const sidebarVariants = {
    hidden: {
      x: "-100%",
      rotateY: -45,
      opacity: 0,
    },
    visible: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 30,
      },
    },
  };

  const menuItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };
  return (
    <header className="sticky top-0 z-50 bg-white shadow flex items-center justify-between py-4 px-4 sm:px-6 md:px-10 font-medium">
      <span onClick={() => navigate("/")}>
        <img
          className="w-[100px] sm:w-[110px] cursor-pointer"
          src="/images/logo.png"
          alt="logo"
        />
      </span>
      <ul className="hidden sm:flex gap-4 md:gap-5 text-[15px] md:text-[16px] text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p className="transition-colors duration-200 hover:text-chocolateBrown">
            Home
          </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/shop" className="flex flex-col items-center gap-1">
          <p className="transition-colors duration-200 hover:text-chocolateBrown">
            Shop
          </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p className="transition-colors duration-200 hover:text-chocolateBrown">
            Contact
          </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p className="transition-colors duration-200 hover:text-chocolateBrown">
            About
          </p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden sm:block" onClick={() => setShowSearch(true)}>
          <RiSearchLine className="w-5 h-5 cursor-pointer transition duration-200 ease-in-out hover:scale-110 hover:text-chocolateBrown" />
        </div>
        <div className="group relative hidden sm:block">
          <div onClick={() => (token ? null : navigate("/login"))}>
            <BiUser className="w-6 h-6 text-gray-700 transition duration-200 ease-in-out hover:scale-110 hover:text-chocolateBrown cursor-pointer" />
          </div>
          {token && (
            <div className="absolute right-0 pt-3 hidden group-hover:block dropdown-menu z-50 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:-translate-y-0 transition-all duration-200 ease-in-out">
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
          <HiOutlineShoppingBag className="w-5 h-5 cursor-pointer transition duration-200 ease-in-out hover:scale-110 hover:text-chocolateBrown" />
          {counter >= 1 && (
            <p className="absolute right-[-5px] top-[9px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]">
              {getCartCount()}
            </p>
          )}
        </Link>
        <BiMenuAltRight
          onClick={() => setVisible(true)}
          className="w-6 h-6 cursor-pointer sm:hidden"
        />
      </div>

      {/* Sidebar menu for small screens */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
            className={`fixed inset-0 text-white top-0 left-0 h-full w-full shadow-lg z-[1000] transform-gpu transition-transform duration-300 ease-in-out ${
              visible ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{
              display: visible ? "block" : "none",
              background: `linear-gradient(135deg, #910019, #3d000a),
          -webkit-linear-gradient(135deg, #910019, #3d000a)`,
              //fallback
              backgroundColor: "#3d000a",
            }}
          >
            <div className="flex flex-col h-full text-gray-100">
              {/* Header */}
              <motion.div
                className="flex items-center justify-between px-7 py-4 border-b border-gray-400/30"
                style={{
                  background: `
             linear-gradient(135deg, #b8011f, #3d000a),
             `,
                  backgroundColor: "#3d000a",
                }}
              >
                <span className="text-lg font-semibold text-white tracking-wide">
                  Menu
                </span>
                <FaAngleLeft
                  onClick={() => setVisible(false)}
                  className="w-6 h-6 p-1 rounded-full bg-white/10 text-gray-200 cursor-pointer hover:bg-white/20 hover:text-white transition-colors duration-200"
                />
              </motion.div>
              {/* Navigation */}
              <div className="flex-1 flex flex-col gap-1 p-3">
                <NavLink
                  onClick={() => setVisible(false)}
                  to="/"
                  className={({ isActive }) =>
                    `py-2 px-3 rounded-lg text-base font-medium transition-all duration-300 flex items-center gap-3 ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-200 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <IoHomeOutline className="w-5 h-5" />
                  Home
                </NavLink>
                <NavLink
                  onClick={() => setVisible(false)}
                  to="/shop"
                  className={({ isActive }) =>
                    `py-2 px-3 rounded-lg text-base font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-200 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <IoStorefrontOutline className="w-5 h-5" />
                  Shop
                </NavLink>
                <NavLink
                  onClick={() => setVisible(false)}
                  to="/contact"
                  className={({ isActive }) =>
                    `py-2 px-3 rounded-lg text-base font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-200 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <IoMailOutline className="w-5 h-5" />
                  Contact
                </NavLink>
                <NavLink
                  onClick={() => setVisible(false)}
                  to="/about"
                  className={({ isActive }) =>
                    `py-2 px-3 rounded-lg text-base font-medium transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-200 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <IoInformationCircleOutline className="w-5 h-5" />
                  About
                </NavLink>
                <div
                  onClick={() => {
                    setShowSearch(true);
                    setVisible(false);
                  }}
                  className="py-2 px-3 rounded-lg text-base font-medium transition-all duration-300 text-gray-200 hover:bg-white/10 hover:text-white cursor-pointer flex items-center gap-2"
                >
                  <RiSearchLine className="w-5 h-5" />
                  Search
                </div>
                <div className="py-2 px-3 rounded-lg text-base font-medium transition-all duration-300 text-gray-200 hover:bg-white/10 hover:text-white cursor-pointer flex items-center gap-2">
                  <BiUser className="w-5 h-5" />
                  {token ? (
                    <span
                      onClick={() => {
                        setVisible(false);
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        setVisible(false);
                        navigate("/login");
                      }}
                    >
                      Login
                    </span>
                  )}
                </div>
                {token && (
                  <>
                    <div
                      onClick={() => {
                        setVisible(false);
                        navigate("/orders");
                      }}
                      className="py-2 px-3 rounded-lg text-base font-medium transition-all duration-300 text-gray-200 hover:bg-white/10 hover:text-white cursor-pointer flex items-center gap-2"
                    >
                      <IoCartOutline className="w-5 h-5" />
                      Orders
                    </div>
                    <div
                      onClick={() => {
                        logOut();
                        setVisible(false);
                      }}
                      className="py-2 px-3 rounded-lg text-base font-medium transition-all duration-300 text-gray-200 hover:bg-white/10 hover:text-white cursor-pointer flex items-center gap-2"
                    >
                      <IoLogOutOutline className="w-5 h-5" />
                      Logout
                    </div>
                  </>
                )}
              </div>
              {/* Footer */}
              <div
                className="p-3 border-t border-gray-400/30"
                style={{
                  background: `linear-gradient(135deg, #910019, #3d000a),
          -webkit-linear-gradient(135deg, #910019, #3d000a)`,
                  //fallback
                  backgroundColor: "#3d000a",
                }}
              >
                <p className="text-xs text-gray-300 font-light">
                  © 2025 Martian Horse
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
