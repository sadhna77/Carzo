import React from "react";
import {
  FaCarSide,
  FaTaxi,
  FaTruckPickup,
  FaShuttleVan,
  FaMotorcycle,
  FaBusAlt,
  FaCarCrash,
  FaTram,
  FaTrain,
  FaTruckMonster,
  FaTractor,
  FaCarAlt,
  FaChargingStation,
  FaRoad,
  FaCogs,
} from "react-icons/fa";
import Cardata from "../../../Data/Cardata";


export const Category = () => {
  return (
    <div className="mt-20 font-winky">
      <h1 className="text-center text-3xl font-winky font-bold mb-10 text-[#363cb7]">
        Browse By Type
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-4">
        {Cardata.carTypes2.map((car) => (
          <div
            key={car.id}
            className="flex flex-col items-center justify-center p-4 bg-white hover:shadow rounded-xl hover:bg-gray-100 cursor-pointer transition"
          >
            <div className="text-4xl mb-2 text-primary ">{car.icon}</div>
            <div className="text-lg font-semibold">{car.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
