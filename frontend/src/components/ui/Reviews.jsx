import React from "react";
import { IoStar } from "react-icons/io5";

const colors = {
  pink: "bg-pink-500",
  purple: "bg-purple-700",
  green: "bg-green-600",
  blue: "bg-blue-700",
  yellow: "bg-yellow-400",
  black: "bg-black",
  orange: "bg-orange-500",
};

export const Reviews = ({ stars, carReviews }) => {
  return (
    <div>
      {stars.map((star, index) => (
        <div key={index} className="mt-20 space-y-3">
          <div className="flex items-center gap-3">
            {/* User Icon */}
            <div
              className={`h-10 w-10 flex items-center justify-center rounded-full ${
                colors[carReviews[index]?.color] || "bg-gray-400"
              } text-white text-lg font-semibold`}
            >
              {carReviews[index]?.name?.charAt(0) || "U"}
            </div>

            {/* Name & Rating */}
            <div>
              <div className="text-[15px] font-medium text-gray-800">
                {carReviews[index]?.name || "User"}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">{star}</span>
                <IoStar size={14} color="#16068b" />
              </div>
            </div>
          </div>

          <p className="text-[15px] text-gray-700 leading-relaxed">
            {carReviews[index]?.comment || "No comment provided."}
          </p>
        </div>
      ))}
    </div>
  );
};
