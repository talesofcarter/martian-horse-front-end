import React, { useState, useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import { images } from "../assets/products/products";
import { ShopContext } from "../context/ShopContext";

const Hero = () => {
  const { navigate } = useContext(ShopContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const image = imageRef.current;
    const text = textRef.current;
    const button = buttonRef.current;
    const prevButton = prevButtonRef.current;
    const nextButton = nextButtonRef.current;

    if (image) {
      gsap.fromTo(
        image,
        { scale: 1, opacity: 0 },
        { scale: 1.05, opacity: 1, duration: 1.5, ease: "power2.out" }
      );
    }

    if (text) {
      gsap.fromTo(
        text,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
      );
    }

    if (button) {
      gsap.fromTo(
        button,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power3.out" }
      );
    }

    if (prevButton && nextButton) {
      gsap.fromTo(
        [prevButton, nextButton],
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 1, ease: "back.out(1.7)" }
      );
    }
  }, [currentImageIndex]);

  useEffect(() => {
    const interval = setInterval(goToNextImage, 30000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] mt-10 overflow-hidden bg-gray-900">
      {/* Image with subtle overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />
      <img
        ref={imageRef}
        src={images[currentImageIndex]}
        alt="Hero Image"
        className="w-full h-full object-cover object-center will-change-transform"
      />

      {/* Text Content with Dark Background */}
      <div
        ref={textRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8"
      >
        <div className="bg-gray-900/70 py-4 px-4 sm:py-6 sm:px-6 md:py-8 md:px-8 rounded-lg backdrop-blur-sm w-full max-w-[90%] sm:max-w-[85%] md:max-w-3xl">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-tight">
            Introducing{" "}
            <span className="text-chocolateBrown">Martian Horse</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-4 sm:mb-6 md:mb-8 max-w-xl mx-auto">
            Browse our curated catalogue for the best deals
          </p>
        </div>
      </div>

      {/* Indicator Dots with Dark Background */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${
              currentImageIndex === index
                ? "bg-chocolateBrown w-4 sm:w-6"
                : "bg-white hover:bg-gray-300/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      <div className="hidden md:flex absolute inset-y-0 left-0 z-20 items-center">
        <button
          ref={prevButtonRef}
          onClick={goToPreviousImage}
          className="ml-4 p-2 bg-gray-800/70 rounded-full text-white hover:bg-gray-700/70 transition-all duration-300 cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <div className="hidden md:flex absolute inset-y-0 right-0 z-20 items-center">
        <button
          ref={nextButtonRef}
          onClick={goToNextImage}
          className="mr-4 p-2 bg-gray-800/70 rounded-full text-white hover:bg-gray-700/70 transition-all duration-300 cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;
