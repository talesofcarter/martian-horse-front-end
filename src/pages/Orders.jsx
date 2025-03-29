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
    <div className="min-h-screen bg-gray-50 border-t border-gray-100 mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            My Orders
          </h1>
          <p className="mt-2 text-base text-gray-500">
            Track and manage your recent purchases
          </p>
        </header>

        {/* Orders List */}
        <div className="space-y-8">
          {orderData.length > 0 ? (
            orderData.slice(0, 4).map((item, index) => (
              <div
                key={item._id || index}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 
                          transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28">
                    <img
                      className="w-full h-full object-cover rounded-lg border border-gray-100 shadow-sm"
                      src={item.image[0]}
                      alt={item.name}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm text-gray-600">
                        <li>
                          <span className="font-medium text-gray-700">
                            Price:
                          </span>{" "}
                          {formatPrice(item.price)}
                        </li>
                        <li>
                          <span className="font-medium text-gray-700">
                            Quantity:
                          </span>{" "}
                          {item.quantity}
                        </li>
                        <li>
                          <span className="font-medium text-gray-700">
                            Size:
                          </span>{" "}
                          {item.size}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="mt-3 sm:mt-0 space-y-2 text-sm text-gray-600">
                        <li>
                          <span className="font-medium text-gray-700">
                            Date:
                          </span>{" "}
                          {new Date(item.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </li>
                        <li>
                          <span className="font-medium text-gray-700">
                            Payment Method:
                          </span>{" "}
                          {item.paymentMethod}
                        </li>
                        <li>
                          <span className="font-medium text-gray-700">
                            Payment:
                          </span>{" "}
                          <span
                            className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                              item.payment
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.payment ? "Paid" : "Pending"}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Status and Action */}
                  <div className="flex flex-col items-start sm:items-end gap-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          item.status === "Delivered"
                            ? "bg-green-500"
                            : item.status === "Shipped"
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                        }`}
                      ></span>
                      <span className="text-sm font-semibold text-gray-800">
                        {item.status}
                      </span>
                    </div>
                    <button
                      onClick={loadOrderData}
                      className="w-full sm:w-auto px-5 py-2.5 bg-black text-white text-sm cursor-pointer 
                                font-semibold rounded-md hover:bg-opacity-90 
                                focus:outline-none focus:ring-2 focus:ring-black
                                focus:ring-offset-2 transition-all duration-200"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                No Orders Yet
              </h3>
              <p className="mt-3 text-base text-gray-500">
                When you place an order, it will appear here.
              </p>
              <button
                onClick={() => (window.location.href = "/")} // Assuming redirect to shop
                className="mt-6 inline-block px-6 py-3 bg-chocolateBrown text-white text-sm 
                          font-semibold rounded-full hover:bg-opacity-90 
                          transition-all duration-200"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
