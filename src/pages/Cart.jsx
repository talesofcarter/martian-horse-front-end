import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoCloseOutline } from "react-icons/io5";
import CartTotal from "../components/CartTotal.jsx";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-14 border-t flex flex-col md:flex-row justify-between gap-8">
      {cartData.length > 0 ? (
        <div className="w-full md:w-2/3">
          <div className="flex justify-between items-center text-xl sm:text-2xl mb-6">
            <h1 className="font-semibold text-gray-800">Your Cart</h1>
            {cartData.length > 0 && (
              <p className="text-gray-700">
                {cartData.length} Item{cartData.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
          <div>
            {cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item._id
              );
              return (
                <div
                  key={index}
                  className="py-4 border-t border-gray-300 text-gray-700 grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-start gap-6">
                    <img
                      className="w-16 sm:w-20"
                      src={productData.image[0]}
                      alt={productData.name}
                    />
                    <div>
                      <p className="text-sm sm:text-lg font-medium text-gray-800">
                        {productData.name}
                      </p>
                      <div className="flex items-center gap-3 sm:gap-5 mt-2">
                        <p className="text-base">
                          {currency} {productData.price.toLocaleString()}
                        </p>
                        <p className="px-2 sm:px-3 py-1 border border-gray-300 bg-slate-50 text-sm rounded">
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  <input
                    onChange={(e) => {
                      const newValue = e.target.value;
                      if (newValue === "" || newValue === "0") {
                        updateQuantity(item._id, item.size, 1);
                      } else {
                        updateQuantity(item._id, item.size, Number(newValue));
                      }
                    }}
                    className="border border-gray-300 max-w-16 sm:max-w-20 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-chocolateBrown focus:border-transparent transition-all"
                    type="number"
                    min={1}
                    value={item.quantity}
                  />
                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="text-gray-700 hover:text-chocolateBrown transition-colors duration-200"
                  >
                    <IoCloseOutline className="w-6 h-6" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <section className="w-full md:w-2/3 flex items-center justify-center min-h-[50vh]">
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
              It looks like you haven’t added anything yet. Browse our
              collection and find something you love!
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-black text-white py-3 px-6 rounded text-base font-medium hover:bg-chocolateBrown transition-all duration-300 cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        </section>
      )}
      <div className="w-full md:w-1/3">
        <CartTotal />
      </div>
    </div>
  );
};

export default Cart;
