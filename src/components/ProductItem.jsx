import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductItem = ({ id, image, name, price }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { currency } = useContext(ShopContext);

  // scroll to top
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  return (
    <Link
      className="text-gray-700 cursor-pointer"
      to={`/product/${id}`}
      onClick={handleClick}
    >
      <div
        className="relative overflow-hidden border border-gray-200 rounded-lg shadow-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          className="w-full hover:scale-110 transition-transform ease-in-out duration-300"
          src={image[0]}
          alt={name}
        />

        {isHovered && (
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "tween", stiffness: 50, damping: 10 }}
            className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 text-white py-2 text-sm font-medium hover:bg-chocolateBrown cursor-pointer text-center"
          >
            Select Option
          </motion.button>
        )}
      </div>

      {/* Product Details */}
      <div className="mt-3 px-4 py-4 bg-white border border-gray-100 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
        <h3 className="text-base text-black font-medium tracking-wide leading-tight truncate">
          {name}
        </h3>
        <p className="text-sm font-semibold text-black mt-1">
          {currency}{" "}
          <span className="text-black text-base">
            {Number(price).toLocaleString("en-US")}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
