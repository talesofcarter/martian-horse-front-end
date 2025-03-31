import React, { useState, useContext } from "react";
import { links, quickLinks, socials, getDate } from "../assets/products/info";
import { ShopContext } from "../context/ShopContext";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";

const socialsData = [
  {
    name: "instagram",
    icon: <FaInstagram />,
    link: "https://instagram.com/martianhorse",
  },
  {
    name: "facebook",
    icon: <FaFacebook />,
    link: "https://facebook.com/martianhorse",
  },
  { name: "whatsapp", icon: <FaWhatsapp />, link: "https://wa.me/15551234567" },
];

const socialsList = socialsData.map(({ name, icon, link }) => (
  <li
    key={name}
    className="flex items-center gap-2 cursor-pointer hover:text-gray-300 transition-colors duration-200"
  >
    <span className="text-xl">{icon}</span>
    <a href={link} target="_blank" rel="noopener noreferrer">
      {name}
    </a>
  </li>
));

function Footer() {
  const { navigate } = useContext(ShopContext);

  const linkElement = links.map((url) => (
    <li key={url.link}>
      <a
        className="hover:text-gray-300 transition-colors duration-200 cursor-pointer"
        onClick={() => navigate(url.path)}
      >
        {url.link}
      </a>
    </li>
  ));

  const quickLinksElement = quickLinks.map((url) => (
    <li key={url.link}>
      <a
        onClick={() => navigate(url.path)}
        className="hover:text-gray-300 transition-colors duration-200 cursor-pointer"
      >
        {url.link}
      </a>
    </li>
  ));

  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* About Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4 tracking-wide">About Us</h3>
          <p className="text-base leading-relaxed mb-4">
            Martian Horse is a Nairobi-based fashion brand specializing in
            stylish and high-quality women’s clothing.
          </p>
          <p className="text-base mb-2">
            <span className="font-medium">E.</span> martianhorse@gmail.com
          </p>
          <p className="text-base">
            <span className="font-medium">T.</span> (254) 7001224
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 tracking-wide">Company</h3>
          <ul className="space-y-2 text-base">{linkElement}</ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-2 text-base">{quickLinksElement}</ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-4 tracking-wide">
            Follow Us
          </h3>
          <div className="space-y-2">{socialsList}</div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className=" py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <hr className="border-white/50 mb-4" />
          <p className="text-center text-sm">
            Copyright {getDate()} © Martian Horse - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
