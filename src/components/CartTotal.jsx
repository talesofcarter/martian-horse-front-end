import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount, navigate } =
    useContext(ShopContext);
  return (
    <section class="bg-lightGray p-8 rounded border border-gray-300 w-full max-w-md mx-auto">
      <header class="mb-6">
        <h1 class="text-xl font-semibold">Order Summary</h1>
      </header>

      <div class="space-y-4 text-sm">
        <div class="flex justify-between">
          <p class="text-[16px]">Subtotal</p>
          <p class="text-[16px]">
            {currency}{" "}
            {getCartAmount().toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <hr className="border-gray-300" />

        <div className="flex justify-between">
          <p className="text-[16px]">Shipping</p>
          <p className="text-[16px]">
            {currency} {new Intl.NumberFormat("en-KE").format(delivery_fee)}
          </p>
        </div>

        <hr className="border-gray-300" />

        <div className="flex justify-between">
          <strong className="text-[16px]">Total</strong>
          <strong className="text-[16px]">
            {currency}{" "}
            {(getCartAmount() === 0
              ? 0
              : getCartAmount() + delivery_fee
            ).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </strong>
        </div>
      </div>

      <div class="mt-6 space-y-4">
        <button
          onClick={() => navigate("/place-order")}
          className="w-full bg-black text-white text-[16px] py-3 rounded hover:bg-chocolateBrown transition-all duration-300 cursor-pointer"
        >
          Proceed to Checkout
        </button>

        <div className="text-center">
          <button className="text-[16px] hover:text-chocolateBrown hover:underline cursor-pointer">
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartTotal;
