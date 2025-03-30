import React from "react";
import NewsLetterBox from "./../components/NewsLetterBox.jsx";
const About = () => {
  return (
    <section>
      {/* Header */}
      <header className="text-center pt-8 pb-12">
        <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
          About Us
        </h1>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12 items-center mb-10">
        <div className="w-full md:w-1/2">
          <img
            className="w-full max-w-[450px] h-auto object-contain"
            src="/images/martian-hero.jpg"
            alt="Martian Horse fashion showcase"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 text-gray-700">
          <p className="text-lg leading-relaxed">
            At{" "}
            <span className="font-semibold text-primaryColor">
              Martian Horse
            </span>
            , we believe every woman deserves to feel confident, stylish, and
            empowered. We craft high-quality, fashion-forward apparel that
            blends elegance with comfort. From timeless classics to bold
            statement pieces, our designs feature premium fabrics and meticulous
            craftsmanship. Whether for a casual day out or a special occasion,
            Martian Horse elevates your wardrobe with style, strength, and
            sophistication.{" "}
          </p>
          <h2 className="text-xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            We empower women with high-quality, stylish, and comfortable fashion
            that celebrates confidence and individuality. Our designs blend
            timeless elegance with modern trends, ensuring every woman feels
            bold and beautiful. Fashion is more than clothing—it’s a statement
            of strength and self-expression.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
            <div className="bg-gradient-to-br from-martianRed to-darkRed p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-4">
                Premium Quality
              </h3>
              <p className="text-base leading-relaxed text-white">
                We use high-quality fabrics and meticulous craftsmanship to
                create stylish, durable, and comfortable wear that stands the
                test of time.
              </p>
            </div>
            <div className="bg-gradient-to-br from-martianRed to-darkRed p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-white">
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <p className="text-base leading-relaxed">
                Your satisfaction is our priority! We offer personalized
                support, easy returns, and a seamless shopping experience to
                ensure you feel valued.
              </p>
            </div>
            <div className="bg-gradient-to-br from-martianRed to-darkRed text-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold mb-4">Trendy Design</h3>
              <p className="text-base leading-relaxed">
                Our collections fuse modern trends with timeless elegance,
                offering versatile pieces that elevate your style for any
                occasion.
              </p>
            </div>
          </div>
        </div>
        <NewsLetterBox />
      </div>
    </section>
  );
};

export default About;
