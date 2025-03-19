import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  const formatPrice = (price) => {
    return `${currency} ${price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track and manage your recent purchases
          </p>
        </header>

        <div className="space-y-6">
          {products.slice(1, 4).map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 
                        hover:shadow-md transition-shadow duration-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Product Info */}
                <div className="flex gap-4 col-span-2">
                  <div className="flex-shrink-0">
                    <img
                      className="w-16 h-16 object-cover rounded-md"
                      src={item.image[0]}
                      alt={item.name}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <p>{formatPrice(item.price)}</p>
                      <p>Quantity: 1</p>
                      <p>Size: M</p>
                      <p className="col-span-2">
                        Date:{" "}
                        <span className="text-gray-500">17 March, 2025</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex flex-col justify-between items-end">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-sm font-medium text-gray-700">
                      Ready to ship
                    </span>
                  </div>
                  <button
                    className="mt-4 px-4 py-2 bg-black text-white text-sm 
                             font-medium rounded-md hover:bg-chocolateBrown 
                             focus:outline-none focus:ring-2 focus:ring-chocolateBrown 
                             focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="mt-2 text-sm text-gray-600">
              When you place an order, it will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
