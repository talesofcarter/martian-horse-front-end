import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import {
  FaUser,
  FaMapMarkerAlt,
  FaBox,
  FaCalendarAlt,
  FaEdit,
  FaSignOutAlt,
  FaLock,
  FaClipboardList,
  FaAddressBook,
  FaRoad,
  FaCity,
  FaMap,
  FaEnvelope,
  FaFlag,
} from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { backendUrl, navigate, setToken, setCartItems } =
    useContext(ShopContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No authentication token found. Please login");
        }

        const response = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });

        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        setUser(response.data.data);
        setError(null);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base text-red-600">Error: {error}</p>
      </div>
    );
  }

  function logOut() {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  }

  return (
    <div className="min-h-screen rounded border-gray-200 mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight flex items-center justify-center sm:justify-start">
            <FaUser className="mr-2 text-gray-700" /> My Profile
          </h1>
          <p className="mt-2 text-base text-gray-500">
            Manage your personal information and account details
          </p>
        </header>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info Card */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white text-3xl font-semibold">
                  {user.firstName[0]}
                  {user.lastName[0]}
                </div>
              </div>

              {/* User Details */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="mt-2 text-base text-gray-500 flex items-center justify-center sm:justify-start">
                  <FaEnvelope className="mr-2 text-gray-600" /> {user.email}
                </p>
                <p className="mt-2 text-base text-gray-500">{user.phone}</p>

                {/* Address and Stats Layout */}
                <div className="mt-6 grid grid-cols-1 gap-6">
                  {/* Address Section */}
                  <div>
                    <h3 className="text-base font-medium text-gray-700 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-gray-600" /> Address
                    </h3>
                    <ul className="mt-2 space-y-2 text-base text-gray-600">
                      <li className="flex items-center">
                        <FaRoad className="mr-2 text-gray-500" />{" "}
                        {user.address.street}
                      </li>
                      <li className="flex items-center">
                        <FaCity className="mr-2 text-gray-500" />{" "}
                        {user.address.city}
                      </li>
                      <li className="flex items-center">
                        <FaMap className="mr-2 text-gray-500" />{" "}
                        {user.address.county}
                      </li>
                      <li className="flex items-center">
                        <FaEnvelope className="mr-2 text-gray-500" />{" "}
                        {user.address.postalcode}
                      </li>
                      <li className="flex items-center">
                        <FaFlag className="mr-2 text-gray-500" />{" "}
                        {user.address.country}
                      </li>
                    </ul>
                  </div>

                  {/* Account Stats Section */}
                  <div>
                    <h3 className="text-base font-medium text-gray-700 flex items-center">
                      <FaBox className="mr-2 text-gray-600" /> Account Stats
                    </h3>
                    <ul className="mt-2 space-y-2 text-base text-gray-600">
                      <li className="flex items-center">
                        <FaBox className="mr-2 text-gray-500" />
                        <span className="font-medium">Orders:</span>{" "}
                        {user.orders}
                      </li>
                      <li className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-500" />
                        <span className="font-medium">Joined:</span>{" "}
                        {user.joinedDate}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="mt-6 flex justify-center sm:justify-end">
              <button
                className="px-6 py-2.5 bg-black text-white text-base font-semibold rounded-md 
                          hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-chocolateBrown 
                          focus:ring-offset-2 transition-all duration-200 flex items-center"
              >
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="lg:col-span-1 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 transition-all duration-300 hover:shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <FaClipboardList className="mr-2 text-gray-700" /> Quick Actions
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <button
                  className="w-full text-left px-4 py-2 bg-gray-100 text-gray-800 text-base font-medium 
                            rounded-md hover:bg-gray-200 transition-colors duration-200 cursor-pointer flex items-center"
                >
                  <FaBox className="mr-2" /> View Orders
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 bg-gray-100 text-gray-800 text-base font-medium 
                            rounded-md hover:bg-gray-200 transition-colors duration-200 cursor-pointer flex items-center"
                >
                  <FaLock className="mr-2" /> Change Password
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 bg-gray-100 text-gray-800 text-base font-medium 
                            rounded-md hover:bg-gray-200 transition-colors duration-200 cursor-pointer flex items-center"
                >
                  <FaAddressBook className="mr-2" /> Manage Addresses
                </button>
              </li>
              <li>
                <button
                  onClick={logOut}
                  className="w-full px-4 py-2 text-base bg-black text-white font-medium rounded-md 
                            hover:bg-chocolateBrown transition-colors duration-200 ease-in-out cursor-pointer flex items-center justify-center"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
