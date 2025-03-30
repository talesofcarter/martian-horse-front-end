import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { MdOutlineStarBorder, MdOutlineStar } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { ClipLoader } from "react-spinners"; // For loading state
import RelatedProducts from "../components/RelatedProducts";
import { BiMinus } from "react-icons/bi";
import CartActions from "../components/CartActions";

const Product = () => {
  const { productId } = useParams();
  const {
    products,
    currency,
    addToCart,
    cartItems,
    getCartCount,
    updateQuantity,
    clearCart,
  } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  const isInCart = cartItems[productId] && cartItems[productId][size];

  const hasCartItems = getCartCount() > 0;

  useEffect(() => {
    const fetchProductData = () => {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);

        if (cartItems[productId]) {
          const sizesInCart = Object.keys(cartItems[productId]);
          if (sizesInCart.length > 0) {
            setSize(sizesInCart[0]);
            setCount(cartItems[productId][sizesInCart[0]]);
          }
        }
      }
      setIsLoading(false);
    };

    fetchProductData();
  }, [productId, products, cartItems]);

  const handleQuantityChange = (newCount) => {
    if (newCount < 1) return;
    setCount(newCount);

    if (isInCart) {
      updateQuantity(productId, size, newCount);
    }
  };

  const handleAddToCart = () => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    addToCart(productId, size);
    setCount(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#000" size={50} />
      </div>
    );
  }

  if (!productData) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:w-1/5">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={`Product Thumbnail ${index + 1}`}
                onClick={() => setImage(item)}
                className={`rounded-lg cursor-pointer border-2 ${
                  image === item ? "border-orange-500" : "border-gray-200"
                } hover:border-orange-300 transition-all`}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1">
            <img
              src={image}
              alt={productData.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{productData.name}</h1>
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, index) => (
              <MdOutlineStarBorder
                key={index}
                className="w-6 h-6 text-yellow-400"
              />
            ))}
            <p className="text-gray-500">(0 reviews)</p>
          </div>
          <p className="text-4xl font-semibold mb-6">
            {currency} {productData.price.toLocaleString()}
          </p>
          <p className="text-gray-700 mb-8">{productData.description}</p>

          {/* Size Selection */}
          <div className="mb-8">
            <p className="text-lg font-medium mb-4">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`px-6 py-2 border rounded-lg text-sm font-medium ${
                    size === item
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-gray-100 border-gray-200 hover:bg-gray-200"
                  } transition-all cursor-pointer`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex gap-4 mb-8">
            <div
              className={`flex items-center border border-gray-300 rounded-lg w-[140px] ${
                !isInCart ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <button
                onClick={() => handleQuantityChange(count - 1)}
                className="px-4 py-2 hover:bg-gray-100 transition-all cursor-pointer"
                disabled={!isInCart}
              >
                <BiMinus />
              </button>
              <span className="px-4 py-2">{count}</span>
              <button
                onClick={() => handleQuantityChange(count + 1)}
                className="px-4 py-2 hover:bg-gray-100 transition-all cursor-pointer"
                disabled={!isInCart}
              >
                <GoPlus />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`px-8 py-3 rounded-lg transition-all cursor-pointer ${
                isInCart
                  ? "bg-gray-500 text-white hover:bg-gray-600"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {isInCart ? "Update Cart" : "Add to Cart"}
            </button>
            {hasCartItems && <CartActions />}
          </div>

          <hr className="text-gray-500 my-8 sm:w-4/5" />

          {/* Additional Info */}
          <div className=" text-gray-600">
            <p>Free shipping on orders over {currency} 100.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>7-day return policy.</p>
          </div>
        </div>
      </div>
      {/*----- Description & Review ----- */}
      <div className="mt-20">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            className={`relative px-6 py-3 text-sm font-medium ${
              activeTab === "description"
                ? "text-black"
                : "text-gray-500 hover:text-gray-700"
            } transition-all cursor-pointer`}
            onClick={() => setActiveTab("description")}
          >
            Description
            {/* Active Tab Indicator */}
            {activeTab === "description" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>
            )}
          </button>
          <button
            className={`relative px-6 py-3 text-sm font-medium ${
              activeTab === "reviews"
                ? "text-black"
                : "text-gray-500 hover:text-gray-700"
            } transition-all cursor-pointer`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (0)
            {/* Active Tab Indicator */}
            {activeTab === "reviews" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">
          {activeTab === "description" && (
            <div className="text-gray-600 leading-7">
              <p>{productData.description}</p>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="text-gray-600">
              <p>No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </div>
      </div>
      {/* ----- related products ------- */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
