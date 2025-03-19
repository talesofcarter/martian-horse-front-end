import React from "react";
import { GoShieldCheck } from "react-icons/go";
import { CiTimer } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";

const OurPolicy = () => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <TbTruckDelivery className="w-12 h-12 m-auto mb-5 " />
            <p className="font-semibold text-lg text-gray-800 mb-2">
              Free Delivery
            </p>
            <p className="text-gray-500">For all orders within Nairobi</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <CiTimer className="w-12 h-12 m-auto mb-5 " />
            <p className="font-semibold text-lg text-gray-800 mb-2">
              7 Days Return
            </p>
            <p className="text-gray-500">We offer a 7-day return policy</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <GoShieldCheck className="w-12 h-12 m-auto mb-5 " />
            <p className="font-semibold text-lg text-gray-800 mb-2">
              Secure Payments
            </p>
            <p className="text-gray-500">100% secure payments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
