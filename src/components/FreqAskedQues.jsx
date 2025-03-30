import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const FreqAskedQues = () => {
  const [openGeneral, setOpenGeneral] = useState(false);
  const [openQuizOne, setOpenQuizOne] = useState(false);
  const [openQuizTwo, setOpenQuizTwo] = useState(false);
  const [openQuizThree, setOpenQuizThree] = useState(false);

  return (
    <section className="min-h-[70vh] my-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
          Frequently Asked Questions
        </h1>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setOpenGeneral((prev) => !prev)}
            >
              <h2 className="text-lg font-semibold text-gray-800">General</h2>
              <div
                className={`transform transition-transform duration-300 ${
                  openGeneral ? "rotate-180" : ""
                }`}
              >
                <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-600" />
              </div>
            </div>

            {openGeneral && (
              <div>
                <div className="p-4 border-t border-gray-100 animate-fade-in">
                  <div className="flex items-center justify-between text-gray-700 font-medium mb-2">
                    <p>What types of products do you sell?</p>
                    <div
                      className={`transform transition-transform duration-300 cursor-pointer ${
                        openQuizOne ? "rotate-180" : ""
                      }`}
                      onClick={() => setOpenQuizOne((prev) => !prev)}
                    >
                      <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  {openQuizOne && (
                    <p className="text-gray-600 leading-relaxed">
                      We specialize in women's fashion, including dresses, tops,
                      jeans, shoes, accessories, and more.
                    </p>
                  )}
                </div>
                <div>
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-gray-700 font-medium mb-2">
                      <p>Do you have a physical store?</p>
                      <div
                        className={`transform transition-transform duration-300 cursor-pointer ${
                          openQuizTwo ? "rotate-180" : ""
                        }`}
                        onClick={() => setOpenQuizTwo((prev) => !prev)}
                      >
                        <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-600" />
                      </div>
                    </div>
                    {openQuizTwo && (
                      <p className="text-gray-600 leading-relaxed">
                        We are an online-only store (or mention your physical
                        locations if available).
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 border-t border-gray-100 animate-fade-in">
                  <div className="flex items-center justify-between text-gray-700 font-medium mb-2">
                    <p>How can I contact customer support?</p>
                    <div
                      className={`transform transition-transform duration-300 cursor-pointer ${
                        openQuizThree ? "rotate-180" : ""
                      }`}
                      onClick={() => setOpenQuizThree((prev) => !prev)}
                    >
                      <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  {openQuizThree && (
                    <p className="text-gray-600 leading-relaxed">
                      You can reach us via email at our official contacts
                      available on the website. We also respond to messages on
                      our social media channels.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setOpenGeneral((prev) => !prev)}
            >
              <h2 className="text-lg font-semibold text-gray-800">
                Payment and Ordering
              </h2>
              <div
                className={`transform transition-transform duration-300 ${
                  openGeneral ? "rotate-180" : ""
                }`}
              >
                <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-600" />
              </div>
            </div>

            {openGeneral && (
              <div>
                <div className="p-4 border-t border-gray-100 animate-fade-in">
                  <div className="flex items-center justify-between text-gray-700 font-medium mb-2">
                    <p>How do I place an order?</p>
                    <div
                      className={`transform transition-transform duration-300 cursor-pointer ${
                        openQuizOne ? "rotate-180" : ""
                      }`}
                      onClick={() => setOpenQuizOne((prev) => !prev)}
                    >
                      <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  {openQuizOne && (
                    <p className="text-gray-600 leading-relaxed">
                      Simply browse our collection, add items to your cart, and
                      proceed to checkout.
                    </p>
                  )}
                </div>
                <div>
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-gray-700 font-medium mb-2">
                      <p>What payment methods do you accept?</p>
                      <div
                        className={`transform transition-transform duration-300 cursor-pointer ${
                          openQuizTwo ? "rotate-180" : ""
                        }`}
                        onClick={() => setOpenQuizTwo((prev) => !prev)}
                      >
                        <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-600" />
                      </div>
                    </div>
                    {openQuizTwo && (
                      <p className="text-gray-600 leading-relaxed">
                        We accept accept Mpesa, Airtel Money, and Cash on
                        Delivery.
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 border-t border-gray-100 animate-fade-in">
                  <div className="flex items-center justify-between text-gray-700 font-medium mb-2">
                    <p>Can I modify or cancel my order after placing it?</p>
                    <div
                      className={`transform transition-transform duration-300 cursor-pointer ${
                        openQuizThree ? "rotate-180" : ""
                      }`}
                      onClick={() => setOpenQuizThree((prev) => !prev)}
                    >
                      <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                  {openQuizThree && (
                    <p className="text-gray-600 leading-relaxed">
                      Orders can be modified or canceled within 1 hour after
                      purchase. Contact us as soon as possible for assistance.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreqAskedQues;
