import React, { useState, useEffect, useRef } from "react";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import gsap from "gsap";
import { images } from "../assets/products/products";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImageRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

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
    const heroImage = heroImageRef.current;
    const text = textRef.current;
    const button = buttonRef.current;

    gsap.fromTo(
      heroImage,
      { scale: 1 },
      { scale: 1.5, duration: 20, ease: "power2.out" }
    );

    gsap.fromTo(
      text,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
    );

    gsap.fromTo(
      button,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power2.out" }
    );
  }, [currentImageIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextImage();
    }, 59000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <section className="relative w-full h-[470px] overflow-hidden">
      <video
        src="/reel/martian-horse-reel.mp4"
        autoPlay
        muted
        loop
        className="w-full h-full object-none"
      />

      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-50 text-black text-center"
      >
        <h1 className="text-4xl font-bold text-white [text-shadow:_0_2px_4px_rgba(0,0,0,0.8)]">
          Introducing Martian Horse
        </h1>
      </div>

      <button
        onClick={goToPreviousImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
      >
        <FiArrowLeftCircle className="text-gray-500 cursor-pointer" size={32} />
      </button>
      <button
        onClick={goToNextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
      >
        <FiArrowRightCircle
          className="text-gray-500 cursor-pointer"
          size={32}
        />
      </button>

      <button
        ref={buttonRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-50 px-6 py-2 rounded cursor-pointer hover:bg-opacity-75 transition-all hover:bg-chocolateBrown hover:text-white duration-500"
      >
        Shop Now
      </button>
    </section>
  );
};

export default Hero;
