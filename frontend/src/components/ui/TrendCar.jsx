import React from "react";
import { FaGasPump, FaRoad, FaCogs } from "react-icons/fa";
import { MdOutlineOpenInNew } from "react-icons/md";


export const TrendCar = ({ data }) => {
  return (
    <div className="w-90 md:w-full bg-white rounded-xl shadow-md overflow-hidden border ">
      {/* Car Image */}
      <img
        src={data.image}
        alt={data.name}
        className="w-full h-30 object-cover rounded-t-xl"
      />

      {/* Car Details */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 text-center">
          {data.name}
        </h2>

        <div className="my-2 border-t border-gray-200" />

        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FaRoad className="text-blue-600" />
            <span>{data.mileage}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaGasPump className="text-green-600" />
            <span>{data.fuelType}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCogs className="text-purple-600" />
            <span>{data.transmission}</span>
          </div>
        </div>

        <div className="my-3 border-t border-gray-200" />

        <div className="flex items-center justify-between">
          <p className="text-base font-bold ">{data.price}</p>
          <button className="text-sm text-[#363cb7] px-3 py-1 rounded-md  transition flex items-center gap-1">
            View Details
            <MdOutlineOpenInNew  color="#0754fc"/>
          </button>
          

        </div>
      </div>
    </div>
  );
};
