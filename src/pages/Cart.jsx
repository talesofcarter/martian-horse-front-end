import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import CartTotal from "../components/CartTotal.jsx";
import EmptyCart from "../components/EmptyCart.jsx";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
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
    }
  }, [cartItems, products]);

  return (
    <section
      className={`container mx-auto px-4 sm:py-14 py-6 flex md:flex-row ${
        cartData.length === 0
          ? "justify-center items-center"
          : "flex-col justify-center md:justify-between gap-8"
      }`}
    >
      <div
        className={`w-full md:w-2/3 flex ${
          cartData.length === 0
            ? "justify-center items-center"
            : "flex justify-center md:justify-start"
        }`}
      >
        {cartData.length > 0 ? (
          <div className="w-full">
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
                if (!productData) {
                  return (
                    <div
                      key={index}
                      className="py-4 border-t border-gray-300 text-gray-700"
                    >
                      <p>Product not found (ID: {item._id})</p>
                    </div>
                  );
                }
                return (
                  <div
                    key={index}
                    className="py-4 border-t border-gray-300 text-gray-700 grid grid-cols-[4fr_1fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                  >
                    <div className="flex items-start gap-6">
                      <img
                        className="w-16 sm:w-20 rounded-md"
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
                      className="text-gray-700 hover:text-chocolateBrown transition-colors duration-200 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
      {cartData.length > 0 && (
        <div className="w-full md:w-1/3">
          <CartTotal />
        </div>
      )}
    </section>
  );
};

export default Cart;
