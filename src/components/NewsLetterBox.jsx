import React from "react";

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Subscribe Now & Get <span className="text-martianRed">10% Off</span>
        </h2>
        <p className="text-gray-500 text-lg mb-8">
          Be the first to know about our new arrivals and exclusive offers.
        </p>

        {/* Form */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <input
            className="w-full sm:w-96 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-darkRed focus:border-transparent transition-all duration-300"
            style={{
              WebkitAppearance: "none", // Remove iOS default input styling
              MozAppearance: "none",
              appearance: "none",
              border: "1px solid #d1d5db", // Explicit border (gray-300)
              backgroundColor: "#ffffff", // Ensure white background
            }}
            type="email"
            placeholder="Enter your email address"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-black text-white font-semibold px-8 py-3 rounded-lg hover:bg-martianRed transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            style={{
              backgroundColor: "#000000", // Fallback for bg-black
              transitionProperty: "background-color, box-shadow", // Explicit transitions
              transitionDuration: "300ms",
              transitionTimingFunction: "ease-in-out",
            }}
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetterBox;
