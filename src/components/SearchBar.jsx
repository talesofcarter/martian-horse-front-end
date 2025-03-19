import React, { useEffect, useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FiSearch } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("shop")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="flex justify-center items-center my-6 px-4 animate-fadeIn">
      <div className="relative inline-flex items-center w-full max-w-xl bg-white border border-gray-200 rounded-xl">
        {/* Search Icon */}
        <div className="flex-shrink-0 pl-4 py-2.5">
          <FiSearch className="w-5 h-5 text-gray-400 transition-colors duration-200 " />
        </div>

        {/* Input Field */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 bg-transparent outline-none text-gray-800 text-sm placeholder-gray-400"
          type="text"
          placeholder="Search for items..."
        />

        {/* Close Button */}
        <button
          className="flex-shrink-0 pr-4 py-2.5"
          onClick={() => setShowSearch(false)}
        >
          <MdOutlineClose className="w-5 h-5 text-gray-400 transition-all duration-200 hover:rotate-90" />
        </button>
      </div>
    </div>
  ) : null;
};
export default SearchBar;
