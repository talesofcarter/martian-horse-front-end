import React from "react";

const Title = ({ heading }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p children className="text-gray-800">
        {heading}
      </p>
    </div>
  );
};

export default Title;
