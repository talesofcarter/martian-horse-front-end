import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-12">
      <form
        onSubmit={onSubmitHandler}
        className="relative w-[90%] sm:max-w-md mx-auto p-8 rounded-xl custom-shadow flex flex-col items-center gap-6 text-gray-800"
      >
        {/* Heading */}
        <header className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900">
            {currentState}
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            {currentState === "Login"
              ? "Welcome back to your style journey!"
              : "Join us and start shopping!"}
          </p>
        </header>

        {/* Form Fields */}
        <div className="w-full space-y-5">
          {currentState === "Sign Up" && (
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300 transition-all duration-300"
                placeholder="Your Name"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300 transition-all duration-300"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300 transition-all duration-300"
              placeholder="Your Password"
              required
            />
          </div>
        </div>

        {/* Links */}
        <div className="w-full flex justify-between text-sm text-gray-600">
          <a
            href="#"
            className="hover:text-chocolateBrown transition-colors duration-300"
          >
            Forgot your password?
          </a>
          {currentState === "Login" ? (
            <button
              type="button"
              onClick={() => setCurrentState("Sign Up")}
              className="hover:text-chocolateBrown transition-colors duration-300"
            >
              Create an account
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentState("Login")}
              className="hover:text-chocolateBrown transition-colors duration-300"
            >
              Login here
            </button>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white px-8 py-3 rounded-lg hover:bg-chocolateBrown transition-all duration-300 font-medium cursor-pointer"
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </section>
  );
};

export default Login;
