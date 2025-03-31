import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { faqData } from "../assets/products/faqsData";

const AccordionItem = ({ question, answer, isOpen, toggle }) => (
  <div className="p-4 border-t border-gray-100 animate-fade-in">
    <div className="flex items-center justify-between text-gray-700 font-medium mb-2">
      <p>{question}</p>
      <div
        className={`transform transition-transform duration-300 cursor-pointer ${
          isOpen ? "rotate-180" : ""
        }`}
        onClick={toggle}
      >
        <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-600" />
      </div>
    </div>
    {isOpen && <p className="text-gray-600 leading-relaxed">{answer}</p>}
  </div>
);

const AccordionSection = ({ title, items, isOpen, toggleSection }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100">
    <div
      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
      onClick={toggleSection}
    >
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <div
        className={`transform transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-600" />
      </div>
    </div>
    {isOpen &&
      items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={item.isOpen}
          toggle={() => item.toggle(index)}
        />
      ))}
  </div>
);

const FreqAskedQues = () => {
  const [state, setState] = useState({
    sections: {
      General: false,
      "Payment and Ordering": false,
    },
    items: Object.fromEntries(
      Object.entries(faqData).map(([section]) => [
        section,
        faqData[section].map(() => false),
      ])
    ),
  });

  const toggleSection = (section) => {
    setState((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: !prev.sections[section],
      },
    }));
  };

  const toggleItem = (section, index) => {
    setState((prev) => ({
      ...prev,
      items: {
        ...prev.items,
        [section]: prev.items[section].map((item, i) =>
          i === index ? !item : item
        ),
      },
    }));
  };

  return (
    <section className="min-h-[70vh] my-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          {Object.entries(faqData).map(([section, items]) => (
            <AccordionSection
              key={section}
              title={section}
              items={items.map((item, index) => ({
                ...item,
                isOpen: state.items[section][index],
                toggle: () => toggleItem(section, index),
              }))}
              isOpen={state.sections[section]}
              toggleSection={() => toggleSection(section)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreqAskedQues;
