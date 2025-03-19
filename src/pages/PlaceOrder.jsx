// PlaceOrder.jsx
import React from "react";
import CartTotalCheckout from "../components/CartTotalCheckout";

const PlaceOrder = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
        Checkout
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Billing Information Section */}
        <section className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Billing Information
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                    type="text"
                    placeholder="First Name *"
                    required
                  />
                </div>
                <div>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                    type="text"
                    placeholder="Last Name *"
                    required
                  />
                </div>
              </div>

              <div>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                  type="email"
                  placeholder="Email Address *"
                  required
                />
              </div>

              <div>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                  type="text"
                  placeholder="Street Address *"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                    type="text"
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                    type="text"
                    placeholder="County / Province"
                    required
                  />
                </div>
              </div>

              <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                    type="number"
                    placeholder="Postal / ZIP Code"
                    required
                  />
                </div>
                <div>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                    type="text"
                    placeholder="Country"
                    required
                  />
                </div>
              </fieldset>

              <div>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                  type="tel"
                  placeholder="Phone"
                  required
                />
              </div>
            </form>
          </div>
        </section>

        {/* Order Summary Section */}
        <section className="lg:col-span-1">
          <CartTotalCheckout />
        </section>
      </div>
    </div>
  );
};

export default PlaceOrder;
