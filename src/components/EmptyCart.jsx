import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const EmptyCart = () => {
  const { navigate } = useContext(ShopContext);
  return (
    <section className="w-full flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-16 h-16 mx-auto text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Your Cart is Empty
        </h2>
        <p className="text-base text-gray-600 max-w-md mx-auto">
          It looks like you haven’t added anything yet. Browse our collection
          and find something you love!
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-black text-white py-3 px-6 rounded text-base font-medium hover:bg-chocolateBrown transition-all duration-300 cursor-pointer"
        >
          Start Shopping
        </button>
      </div>
    </section>
  );
};

export default EmptyCart;
