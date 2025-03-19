import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { motion, AnimatePresence } from "framer-motion";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Shop = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [size, setSize] = useState([]);
  const [price, setPrice] = useState([]);

  const [sortType, setSortType] = useState("relevant");

  function toggleCategory(e) {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setCategory((prev) => [...prev, value]);
    }
  }

  function toggleSubCategory(e) {
    const value = e.target.value;
    if (subCategory.includes(value)) {
      setSubCategory((prev) => prev.filter((item) => item !== value));
    } else {
      setSubCategory((prev) => [...prev, value]);
    }
  }

  function toggleSize(e) {
    const value = e.target.value;
    if (size.includes(value)) {
      setSize((prev) => prev.filter((item) => item !== value));
    } else {
      setSize((prev) => [...prev, value]);
    }
  }

  function togglePrice(e) {
    const value = e.target.value;
    if (price.includes(value)) {
      setPrice((prev) => prev.filter((item) => item !== value));
    } else {
      setPrice((prev) => [...prev, value]);
    }
  }

  function applyFilter() {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (size.length > 0) {
      productsCopy = productsCopy.filter((item) => size.includes(item.size));
    }

    if (price.length > 0) {
      productsCopy = productsCopy.filter((item) => {
        const itemPrice = item.price;
        return price.some((priceTier) => {
          switch (priceTier) {
            case "tier-1":
              return itemPrice >= 0 && itemPrice <= 1000;
            case "tier-2":
              return itemPrice > 1000 && itemPrice <= 1999;
            case "tier-3":
              return itemPrice >= 2000 && itemPrice <= 2999;
            case "tier-4":
              return itemPrice >= 3000 && itemPrice <= 3999;
            case "tier-5":
              return itemPrice >= 4000 && itemPrice <= 4999;
            case "tier-6":
              return itemPrice >= 5000;
            default:
              return false;
          }
        });
      });
    }

    setFilterProducts(productsCopy);
  }

  function sortProduct() {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, size, price, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  const variants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <div className="flex items-center justify-between">
          <div
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            Filters
          </div>
          <IoIosArrowUp
            className={`w-5 h-5 lg:hidden rotate-90 ${
              showFilter ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Category */}
        <AnimatePresence>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`border-t border-b-0 border-gray-300  py-3 mt-3 ${
              showFilter ? "block" : "hidden"
            }`}
          >
            <div className="border-0 border-b border-gray-300 my-3">
              <div className="mb-3 font-medium">
                <div
                  onClick={() => setOpenCategories((prev) => !prev)}
                  className="flex items-center justify-between mb-3 cursor-pointer"
                >
                  <span>Categories</span>
                  <button>
                    {openCategories ? (
                      <IoIosArrowUp className="w-5 h-5 cursor-pointer" />
                    ) : (
                      <IoIosArrowDown className="w-5 h-5 cursor-pointer" />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {openCategories && (
                    <motion.div
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="flex flex-col gap-2 font-light text-gray-700"
                    >
                      <p className="flex gap-3">
                        <input
                          className="custom-checkbox"
                          type="checkbox"
                          onChange={toggleCategory}
                          value={`accessories`}
                        />
                        Accessories
                      </p>
                      <p className="flex gap-3">
                        <input
                          className="custom-checkbox"
                          type="checkbox"
                          onChange={toggleCategory}
                          value={`blouses`}
                        />
                        Blouses
                      </p>
                      <p className="flex gap-3">
                        <input
                          className="custom-checkbox"
                          type="checkbox"
                          onChange={toggleCategory}
                          value={`dresses`}
                        />
                        Dresses
                      </p>
                      <p className="flex gap-3">
                        <input
                          className="custom-checkbox"
                          type="checkbox"
                          onChange={toggleCategory}
                          value={`skirts`}
                        />
                        Skirts
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="border-0 border-b border-gray-300 my-3">
              <div className="mb-3 font-medium">
                <div
                  onClick={() => setOpenSubCategory((prev) => !prev)}
                  className="flex items-center justify-between mb-3 cursor-pointer"
                >
                  <span>Type</span>
                  <button>
                    {openSubCategory ? (
                      <IoIosArrowUp className="w-5 h-5 cursor-pointer" />
                    ) : (
                      <IoIosArrowDown className="w-5 h-5 cursor-pointer" />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {openSubCategory && (
                    <motion.div
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="flex flex-col gap-2 font-light text-gray-700"
                    >
                      <p className="flex gap-3">
                        <input
                          className="custom-checkbox"
                          type="checkbox"
                          onChange={toggleSubCategory}
                          value={`business`}
                        />
                        Business
                      </p>
                      <p className="flex gap-3">
                        <input
                          className="custom-checkbox"
                          type="checkbox"
                          onChange={toggleSubCategory}
                          value={`casual`}
                        />
                        Casual
                      </p>
                      <p className="flex gap-3">
                        <input
                          className="custom-checkbox"
                          type="checkbox"
                          onChange={toggleSubCategory}
                          value={`vacation`}
                        />
                        Vacation
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="border-0 border-b border-gray-300 my-3">
              <div className="mb-3 font-medium">
                <div
                  onClick={() => setOpenSize((prev) => !prev)}
                  className="flex items-center justify-between mb-3 cursor-pointer"
                >
                  <span>Size</span>
                  <button>
                    {openCategories ? (
                      <IoIosArrowUp className="w-5 h-5 cursor-pointer" />
                    ) : (
                      <IoIosArrowDown className="w-5 h-5 cursor-pointer" />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {openSize && (
                    <motion.div
                      variants={variants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="flex flex-col gap-2 font-light text-gray-700"
                    >
                      <p className="flex gap-3">
                        <input
                          onChange={toggleSize}
                          className="custom-checkbox"
                          type="checkbox"
                          value={`L`}
                        />
                        L
                      </p>
                      <p className="flex gap-3">
                        <input
                          onChange={toggleSize}
                          className="custom-checkbox"
                          type="checkbox"
                          value={`M`}
                        />
                        M
                      </p>
                      <p className="flex gap-3">
                        <input
                          onChange={toggleSize}
                          className="custom-checkbox"
                          type="checkbox"
                          value={`S`}
                        />
                        S
                      </p>
                      <p className="flex gap-3">
                        <input
                          onChange={toggleSize}
                          className="custom-checkbox"
                          type="checkbox"
                          value={`XL`}
                        />
                        XL
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mb-3 font-medium">
              <div
                onClick={() => setOpenPrice((prev) => !prev)}
                className="flex items-center justify-between mb-3 cursor-pointer"
              >
                <span>Price</span>
                <button>
                  {openPrice ? (
                    <IoIosArrowUp className="w-5 h-5 cursor-pointer" />
                  ) : (
                    <IoIosArrowDown className="w-5 h-5 cursor-pointer" />
                  )}
                </button>
              </div>
              <AnimatePresence>
                {openPrice && (
                  <motion.div
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="flex flex-col gap-2 font-light text-gray-700"
                  >
                    <p className="flex gap-3">
                      <input
                        onChange={togglePrice}
                        className="custom-checkbox"
                        type="checkbox"
                        value={`tier-1`}
                      />
                      0 - 1,000
                    </p>
                    <p className="flex gap-3">
                      <input
                        onChange={togglePrice}
                        className="custom-checkbox"
                        type="checkbox"
                        value={`tier-2`}
                      />
                      1,000 - 1,999
                    </p>
                    <p className="flex gap-3">
                      <input
                        onChange={togglePrice}
                        className="custom-checkbox"
                        type="checkbox"
                        value={`tier-3`}
                      />
                      2,000 - 2,999
                    </p>
                    <p className="flex gap-3">
                      <input
                        onChange={togglePrice}
                        className="custom-checkbox"
                        type="checkbox"
                        value={`tier-4`}
                      />
                      3,000 - 3,999
                    </p>
                    <p className="flex gap-3">
                      <input
                        onChange={togglePrice}
                        className="custom-checkbox"
                        type="checkbox"
                        value={`tier-5`}
                      />
                      4,000 - 4,999
                    </p>
                    <p className="flex gap-3">
                      <input
                        onChange={togglePrice}
                        className="custom-checkbox"
                        type="checkbox"
                        value={`tier-6`}
                      />
                      5,000+
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title heading={"All Collections"} />

          {/*product sort*/}

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2 bg-gray-50  text-gray-900 rounded-lg focus:ring-blue-500 focus:border-black block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
            name=""
            id=""
          >
            <option value="relevant">Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
        {/* Map products */}
        <div className="grid grid-cols02 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
