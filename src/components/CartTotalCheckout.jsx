// CartTotalCheckout.jsx
import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotalCheckout = () => {
  const { currency, delivery_fee, getCartAmount, navigate } =
    useContext(ShopContext);
  const [method, setMethod] = useState("cod");

  return (
    <section className="bg-lightGray border border-gray-300 rounded p-6 sticky top-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        Order Summary
      </h2>

      <div className="space-y-4 text-gray-600">
        <div className="flex justify-between">
          <span className="text-base">Subtotal</span>
          <span className="text-base">
            {currency}{" "}
            {getCartAmount().toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between">
          <span className="text-base">Shipping</span>
          <span className="text-base">
            {currency}{" "}
            {delivery_fee.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between font-semibold text-gray-800">
          <span className="text-base">Total</span>
          <span className="text-base">
            {currency}{" "}
            {(getCartAmount() === 0
              ? 0
              : getCartAmount() + delivery_fee
            ).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Payment Method</h3>
          <div className="space-y-3">
            <div
              onClick={() => setMethod("mpesa")}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-200"
            >
              <div
                className={`w-5 h-5 border rounded-full flex items-center justify-center ${
                  method === "mpesa"
                    ? "border-black bg-black"
                    : "border-gray-300"
                }`}
              >
                {method === "mpesa" && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                )}
              </div>
              <img
                className="h-8 object-contain"
                src="/images/mpesa-logo.png"
                alt="M-Pesa"
              />
            </div>

            <div
              onClick={() => setMethod("airtelmoney")}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-200"
            >
              <div
                className={`w-5 h-5 border rounded-full flex items-center justify-center ${
                  method === "airtelmoney"
                    ? "border-black bg-black"
                    : "border-gray-300"
                }`}
              >
                {method === "airtelmoney" && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                )}
              </div>
              <img
                className="h-8 object-contain"
                src="/images/airtelmoney.svg"
                alt="Airtel Money"
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/orders")}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-opacity-90 transition-all duration-200 font-medium hover:bg-chocolateBrown cursor-pointer"
        >
          Place Order
        </button>

        <p className="text-xs text-gray-500 text-center">
          Your personal data will be used to process your order and support your
          experience throughout this website.
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full text-black hover:text-chocolateBrown text-sm hover:underline cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    </section>
  );
};

export default CartTotalCheckout;
