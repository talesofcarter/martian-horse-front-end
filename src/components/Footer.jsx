import React from "react";
import { links, quickLinks, socials, getDate } from "../assets/products/info";

function Footer() {
  const linkElement = links.map((url) => <li key={url.link}>{url.link}</li>);

  const quickLinksElement = quickLinks.map((url) => (
    <li key={url.link}>{url.link}</li>
  ));

  const socialsElement = socials.map((url) => (
    <li key={url.link}>{url.link}</li>
  ));
  return (
    <footer>
      <div className="text-white bg-black flex flex-col sm:grid grid-cols-[3fr_3fr_3fr_1fr] h-auto py-12 gap-14 mt-40 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <div>
          <h3 className="text-xl font-bold mb-5">About Us</h3>
          <p className="mb-5 w-full md:w-2/3">
            Martian Horse is a Nairobi-based fashion brand specializing in
            stylish and high-quality women's clothing.
          </p>
          <p className="mb-5">E. martianhorse@gmail.com</p>
          <p>T. (254) 7001224</p>
        </div>

        <div>
          <p className="text-xl font-bold mb-5">Company</p>
          <ul className="flex flex-col gap-1">{linkElement}</ul>
        </div>

        <div>
          <p className="text-xl font-bold mb-5">Quick Links</p>
          <ul className="flex flex-col gap-1">{quickLinksElement}</ul>
        </div>

        <div>
          <p className="text-xl font-bold mb-5">Follow Us</p>
          <ul className="flex flex-col gap-1">{socialsElement}</ul>
        </div>
      </div>
      <div className="bg-black text-white">
        <hr className="w-full text-gray-900" />
        <p className="py-5 text-sm text-center">
          Copyright {getDate()} @ - All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
