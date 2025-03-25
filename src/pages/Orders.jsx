import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.map((order) =>
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          })
        );
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const formatPrice = (price) => {
    return `${currency} ${price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <header className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            My Orders
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Track and manage your recent purchases
          </p>
        </header>

        {/* Orders List */}
        <div className="space-y-6">
          {orderData.length > 0 ? (
            orderData.slice(0, 4).map((item, index) => (
              <div
                key={item._id || index} // Use item._id if available, else index
                className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 
                          transition-shadow duration-300 hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
                    <img
                      className="w-full h-full object-cover rounded-md border border-gray-100"
                      src={item.image[0]}
                      alt={item.name}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
                        {item.name}
                      </h3>
                      <ul className="mt-2 space-y-1 text-sm text-zinc-800">
                        <li>
                          <span className="font-medium">Price:</span>{" "}
                          {formatPrice(item.price)}
                        </li>
                        <li>
                          <span className="font-medium">Quantity:</span>{" "}
                          {item.quantity}
                        </li>
                        <li>
                          <span className="font-medium">Size:</span> {item.size}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="mt-2 sm:mt-0 space-y-1 text-sm text-zinc-800">
                        <li>
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </li>
                        <li>
                          <span className="font-medium">Payment Method:</span>{" "}
                          {item.paymentMethod}
                        </li>
                        <li>
                          <span className="font-medium">Payment:</span>{" "}
                          {item.payment ? "Paid" : "Pending"}
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Status and Action */}
                  <div className="flex flex-col items-start sm:items-end gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.status === "Delivered"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      ></span>
                      <span className="text-sm font-medium text-gray-700">
                        {item.status}
                      </span>
                    </div>
                    <button
                      onClick={loadOrderData}
                      className="w-full sm:w-auto px-4 py-2 bg-gray-800 text-white text-sm 
                                font-medium rounded-md hover:bg-gray-700 
                                focus:outline-none focus:ring-2 focus:ring-gray-500 
                                focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-800">
                No Orders Yet
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                When you place an order, it will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
