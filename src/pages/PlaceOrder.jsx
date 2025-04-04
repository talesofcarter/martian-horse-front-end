import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    currency,
    delivery_fee,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("COD");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    county: "",
    postalcode: "",
    country: "",
    phone: "",
  });

  const [transactionStatus, setTransactionStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (method === "mpesa" && !formData.phone.match(/^0\d{9}$|^254\d{9}$/)) {
      toast.error(
        "Please enter a valid phone number (e.g., 07XXXXXXXX or 2547XXXXXXXX)"
      );
      return;
    }

    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      const clearCart = async () => {
        setCartItems({});
        if (token) {
          const response = await axios.post(
            `${backendUrl}/api/cart/clear`,
            {},
            { headers: { token } }
          );
          if (!response.data.success) {
            console.log("Failed to clear cart:", response.data.message);
            toast.error("Failed to clear cart on server");
          }
        }
      };

      switch (method) {
        case "COD":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            await clearCart();
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "mpesa":
          const responseMpesa = await axios.post(
            `${backendUrl}/api/order/mpesa`,
            orderData,
            { headers: { token } }
          );
          if (responseMpesa.data.success) {
            toast.success(responseMpesa.data.message);
            setOrderId(responseMpesa.data.orderId);
            setTransactionStatus("pending");
            await clearCart();
          } else {
            toast.error(responseMpesa.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    let interval;
    if (orderId && transactionStatus === "pending") {
      interval = setInterval(async () => {
        try {
          const response = await axios.get(
            `${backendUrl}/api/order/status/${orderId}`,
            { headers: { token } }
          );
          if (response.data.success) {
            setTransactionStatus(response.data.paymentStatus);
            if (response.data.paymentStatus === "completed") {
              await new Promise((resolve) => setTimeout(resolve, 2000));
              setCartItems({});
              navigate("/orders");
            } else if (
              response.data.paymentStatus === "cancelled" ||
              response.data.paymentStatus === "timeout" ||
              response.data.paymentStatus === "failed"
            ) {
              setOrderId(null);
            }
          }
        } catch (error) {
          console.log("Error polling order status:", error);
          setTransactionStatus("error");
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [orderId, transactionStatus, backendUrl, token, navigate, setCartItems]);

  return (
    <div className="relative">
      <form
        onSubmit={onSubmitHandler}
        className="container mx-auto px-4 py-8 md:py-12 max-w-7xl"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Checkout
        </h1>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing Information Section */}
          <section className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-6">
                Billing Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      onChange={onChangeHandler}
                      name="firstName"
                      value={formData.firstName}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                      style={{
                        WebkitAppearance: "none", // Remove iOS default styling
                        MozAppearance: "none",
                        appearance: "none",
                        border: "1px solid #d1d5db", // Explicit border (gray-300)
                        backgroundColor: "#ffffff", // Ensure white background
                      }}
                      type="text"
                      placeholder="First Name *"
                      required
                    />
                  </div>
                  <div>
                    <input
                      onChange={onChangeHandler}
                      name="lastName"
                      value={formData.lastName}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        appearance: "none",
                        border: "1px solid #d1d5db",
                        backgroundColor: "#ffffff",
                      }}
                      type="text"
                      placeholder="Last Name *"
                      required
                    />
                  </div>
                </div>

                <div>
                  <input
                    onChange={onChangeHandler}
                    name="email"
                    value={formData.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      appearance: "none",
                      border: "1px solid #d1d5db",
                      backgroundColor: "#ffffff",
                    }}
                    type="email"
                    placeholder="Email Address *"
                    required
                  />
                </div>

                <div>
                  <input
                    onChange={onChangeHandler}
                    name="_ports"
                    value={formData.street}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      appearance: "none",
                      border: "1px solid #d1d5db",
                      backgroundColor: "#ffffff",
                    }}
                    type="text"
                    placeholder="Street Address *"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      onChange={onChangeHandler}
                      name="city"
                      value={formData.city}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        appearance: "none",
                        border: "1px solid #d1d5db",
                        backgroundColor: "#ffffff",
                      }}
                      type="text"
                      placeholder="City"
                      required
                    />
                  </div>
                  <div>
                    <input
                      onChange={onChangeHandler}
                      name="county"
                      value={formData.county}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        appearance: "none",
                        border: "1px solid #d1d5db",
                        backgroundColor: "#ffffff",
                      }}
                      type="text"
                      placeholder="County / Province"
                      required
                    />
                  </div>
                </div>

                <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      onChange={onChangeHandler}
                      name="postalcode"
                      value={formData.postalcode}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        appearance: "none",
                        border: "1px solid #d1d5db",
                        backgroundColor: "#ffffff",
                      }}
                      type="number"
                      placeholder="Postal / ZIP Code"
                      required
                    />
                  </div>
                  <div>
                    <input
                      onChange={onChangeHandler}
                      name="country"
                      value={formData.country}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                      style={{
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        appearance: "none",
                        border: "1px solid #d1d5db",
                        backgroundColor: "#ffffff",
                      }}
                      type="text"
                      placeholder="Country"
                      required
                    />
                  </div>
                </fieldset>

                <div>
                  <input
                    onChange={onChangeHandler}
                    name="phone"
                    value={formData.phone}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      appearance: "none",
                      border: "1px solid #d1d5db",
                      backgroundColor: "#ffffff",
                    }}
                    type="tel"
                    placeholder="Phone"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Order Summary Section */}
          <section className="lg:col-span-1">
            <section
              className="border border-gray-300 rounded p-6 sticky top-4"
              style={{
                backgroundColor: "#f7fafc", // Fallback for bg-lightGray (#f7fafc is Tailwind's lightGray)
              }}
            >
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
                  <h3 className="text-lg font-medium text-gray-700">
                    Payment Method
                  </h3>
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

                    <div
                      onClick={() => setMethod("COD")}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    >
                      <div
                        className={`w-5 h-5 border rounded-full flex items-center justify-center ${
                          method === "COD"
                            ? "border-black bg-black"
                            : "border-gray-300"
                        }`}
                      >
                        {method === "COD" && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                      <span>Pay on Delivery</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-opacity-90 transition-all duration-200 font-medium hover:bg-chocolateBrown cursor-pointer"
                  style={{
                    backgroundColor: "#000000", // Fallback for bg-black
                    transitionProperty: "background-color, opacity", // Explicit transitions
                    transitionDuration: "200ms",
                    transitionTimingFunction: "ease-in-out",
                  }}
                >
                  Place Order
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Your personal data will be used to process your order and
                  support your experience throughout this website.
                </p>

                <button
                  onClick={() => navigate("/")}
                  className="w-full text-black hover:text-chocolateBrown text-sm hover:underline cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </section>
          </section>
        </section>
      </form>

      {/* Transaction Status Overlay */}
      {transactionStatus && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Fallback for bg-black bg-opacity-50
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            {transactionStatus === "pending" && (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-chocolateBrown mx-auto mb-4"></div>
                <p className="text-lg font-semibold text-gray-700">
                  Processing your payment...
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Please enter your M-Pesa PIN on your phone.
                </p>
              </>
            )}
            {transactionStatus === "completed" && (
              <>
                <div className="text-green-500 text-4xl mb-4">✔</div>
                <p className="text-lg font-semibold text-gray-700">
                  Payment Successful!
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Redirecting to your orders...
                </p>
              </>
            )}
            {transactionStatus === "cancelled" && (
              <>
                <div className="text-red-500 text-4xl mb-4">✖</div>
                <p className="text-lg font-semibold text-gray-700">
                  Payment Cancelled
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  You cancelled the transaction.
                </p>
                <button
                  onClick={() => setTransactionStatus(null)}
                  className="mt-4 bg-chocolateBrown text-white py-2 px-4 rounded-md hover:bg-opacity-90"
                  style={{
                    backgroundColor: "#8b4513", // Fallback for chocolateBrown
                  }}
                >
                  Try Again
                </button>
              </>
            )}
            {transactionStatus === "timeout" && (
              <>
                <div className="text-yellow-500 text-4xl mb-4">⏳</div>
                <p className="text-lg font-semibold text-gray-700">
                  Payment Timed Out
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  The transaction took too long.
                </p>
                <button
                  onClick={() => setTransactionStatus(null)}
                  className="mt-4 bg-chocolateBrown text-white py-2 px-4 rounded-md hover:bg-opacity-90"
                  style={{
                    backgroundColor: "#8b4513", // Fallback for chocolateBrown
                  }}
                >
                  Try Again
                </button>
              </>
            )}
            {transactionStatus === "failed" && (
              <>
                <div className="text-red-500 text-4xl mb-4">✖</div>
                <p className="text-lg font-semibold text-gray-700">
                  Payment Failed
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Something went wrong. Please try again.
                </p>
                <button
                  onClick={() => setTransactionStatus(null)}
                  className="mt-4 bg-chocolateBrown text-white py-2 px-4 rounded-md hover:bg-opacity-90"
                  style={{
                    backgroundColor: "#8b4513", // Fallback for chocolateBrown
                  }}
                >
                  Try Again
                </button>
              </>
            )}
            {transactionStatus === "error" && (
              <>
                <div className="text-red-500 text-4xl mb-4">⚠</div>
                <p className="text-lg font-semibold text-gray-700">
                  Error Checking Status
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Please check your connection and try again.
                </p>
                <button
                  onClick={() => setTransactionStatus(null)}
                  className="mt-4 bg-chocolateBrown text-white py-2 px-4 rounded-md hover:bg-opacity-90"
                  style={{
                    backgroundColor: "#8b4513", // Fallback for chocolateBrown
                  }}
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
