// PlaceOrder.jsx
import React, { useState, useContext } from "react";
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

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
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
        setCartItems({}); // Clear local state
        if (token) {
          // Clear server-side cart (middleware handles userId)
          const response = await axios.post(
            `${backendUrl}/api/cart/clear`,
            {}, // No body needed, middleware sets userId
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
            await clearCart(); // Clear cart after success
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
            await clearCart(); // Clear cart after success
            setTimeout(() => navigate("/orders"), 5000);
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

  return (
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
                  type="email"
                  placeholder="Email Address *"
                  required
                />
              </div>

              <div>
                <input
                  onChange={onChangeHandler}
                  name="street"
                  value={formData.street}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-0 focus:ring focus:ring-chocolateBrown focus:border-chocolateBrown transition-all duration-200"
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
                  type="number"
                  placeholder="Phone"
                  required
                />
              </div>
            </div>
          </div>
        </section>

        {/* Order Summary Section */}
        <section className="lg:col-span-1">
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
  );
};

export default PlaceOrder;
