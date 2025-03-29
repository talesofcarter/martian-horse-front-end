import React from "react";

const Profile = () => {
  // Hardcoded user data
  const user = {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phone: "254712345678",
    address: {
      street: "123 Chocolate Lane",
      city: "Nairobi",
      county: "Nairobi County",
      postalcode: "00100",
      country: "Kenya",
    },
    orders: 12,
    joinedDate: "March 15, 2023",
  };

  return (
    <div className="min-h-screen rounded bg-gray-50 border-t border-gray-200 mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            My Profile
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
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="mt-1 text-sm text-gray-500">{user.email}</p>
                <p className="mt-1 text-sm text-gray-500">{user.phone}</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Address
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {user.address.street}, {user.address.city},{" "}
                      {user.address.county}
                      <br />
                      {user.address.postalcode}, {user.address.country}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Account Stats
                    </h3>
                    <ul className="mt-1 space-y-1 text-sm text-gray-600">
                      <li>
                        <span className="font-medium">Orders:</span>{" "}
                        {user.orders}
                      </li>
                      <li>
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
                className="px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-md 
                          hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-chocolateBrown 
                          focus:ring-offset-2 transition-all duration-200"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="lg:col-span-1 bg-white border border-gray-100 rounded-2xl shadow-sm p-6 transition-all duration-300 hover:shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900">
              Quick Actions
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <button
                  className="w-full text-left px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium 
                            rounded-md hover:bg-gray-200 transition-colors duration-200"
                >
                  View Orders
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium 
                            rounded-md hover:bg-gray-200 transition-colors duration-200"
                >
                  Change Password
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium 
                            rounded-md hover:bg-gray-200 transition-colors duration-200"
                >
                  Manage Addresses
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 bg-red-100 text-red-800 text-sm font-medium 
                            rounded-md hover:bg-red-200 transition-colors duration-200"
                >
                  Logout
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
