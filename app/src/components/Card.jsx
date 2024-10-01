import React from "react";

const Card = ({ title, description, author, price }) => {
  return (
    <div className="max-w-sm w-full h-auto rounded overflow-hidden shadow-lg bg-white border border-gray-200 m-5 flex flex-col">
      {/* Card Content */}
      <div className="px-6 py-4 flex-grow">
        {/* Title */}
        <div className="font-bold text-xl mb-2 text-gray-800">{title}</div>

        {/* Description */}
        <p className="text-gray-700 text-base mb-4">{description}</p>

        {/* Author */}
        <p className="text-sm text-gray-500 mb-2">{author}</p>

        {/* Price */}
        <p className="text-lg font-semibold text-gray-900 mb-4">${price}</p>
      </div>

      {/* Enroll Button */}
      <div className="px-6 pb-4">
        <button className="bg-black text-white font-bold py-2 px-4 rounded w-full">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default Card;
