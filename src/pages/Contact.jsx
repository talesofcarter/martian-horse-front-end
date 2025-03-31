import React from "react";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa6";

const Contact = () => {
  return (
    <section className="min-h-screen">
      <header className="text-center pt-12 pb-8 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information Section */}
          <div className="space-y-8">
            <article>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Address
              </h2>
              <p className="text-gray-600">Moi Avenue, Nairobi, KE</p>
            </article>

            <article>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Contact
              </h2>
              <p className="text-gray-600">Phone: +(254)-710-204446</p>
              <p className="text-gray-600">Email: horsemartian8@gmail.com</p>
            </article>

            <article>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Hours of Operation
              </h2>
              <p className="text-gray-600">Mon – Fri: 08:30 – 20:00</p>
              <p className="text-gray-600">Sat & Sun: 09:30 – 21:30</p>
            </article>

            <article className="flex gap-6">
              <a
                href="https://facebook.com/martianhorse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors text-2xl"
              >
                <FaFacebookSquare />
              </a>
              <a
                href="https://instagram.com/martianhorse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 transition-colors text-2xl"
              >
                <FaInstagram />
              </a>

              <a
                href="https://wa.me/254710204446"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-colors text-2xl"
              >
                <FaWhatsapp />
              </a>
            </article>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white custom-shadow p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-600 mb-6">
              Your email address will not be published. Required fields are
              marked *
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name *"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-martianRed focus:border-transparent"
                  style={{
                    WebkitAppearance: "none", // Remove iOS default styling
                    MozAppearance: "none",
                    appearance: "none",
                    border: "1px solid #d1d5db", // Explicit border (gray-300)
                    backgroundColor: "#ffffff", // Ensure white background
                  }}
                  required
                />
                <input
                  type="email"
                  placeholder="Email *"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-martianRed focus:border-transparent"
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                    border: "1px solid #d1d5db",
                    backgroundColor: "#ffffff",
                  }}
                  required
                />
              </div>
              <input
                type="tel"
                placeholder="Phone *"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-martianRed focus:border-transparent"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  border: "1px solid #d1d5db",
                  backgroundColor: "#ffffff",
                }}
                required
              />
              <textarea
                placeholder="Your Message"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-martianRed focus:border-transparent h-32"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  border: "1px solid #d1d5db",
                  backgroundColor: "#ffffff",
                }}
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-martianRed transition-colors duration-300 font-medium cursor-pointer"
                style={{
                  backgroundColor: "#000000", // Fallback for bg-black
                  transitionProperty: "background-color", // Explicit transition
                  transitionDuration: "300ms",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
