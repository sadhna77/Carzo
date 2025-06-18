import React, { useState } from "react";
import { Search } from "./Search";
import pngCar from "../../assets/pngCar.png";
import "./Heroanimation.css";
import { FaGasPump, FaRoad, FaCogs } from "react-icons/fa";
import { MdOutlineOpenInNew } from "react-icons/md";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaRegSadTear } from "react-icons/fa";




export const Hero = () => {
  const [searchedCars, setSearchedCars] = useState([]);
  const [carReverse, setCarReverse] = useState(false);
  const [NotFound,setNotFound] = useState(false);


  const handleSearchComplete = (cars) => {
    setSearchedCars(cars);
    setCarReverse(true);
    console.log("Received in Hero:", cars);
    
  };

     


  return (
    <div>
      <div className="flex flex-col items-center w-full p-10 py-20 gap-6 h-[1100px] font-winky bg-[#B2D8CE]">
        <h1 className="text-lg text-[#648DB3]">Explore Cars Like Never Before.</h1>
        <h1 className="text-[60px] font-bold text-[#5459AC] text-center">Find Your Dream Car</h1>

        {/* Search component */}
        <Search onSearchComplete={handleSearchComplete} />

        {/* Scrollable Search Result Box */}
{/* Scrollable Search Result Box OR Car Image */}
<div className="mt-10 max-w-[1200px] rounded p-4 h-[450px] transition-all duration-700 relative">
  {searchedCars.length > 0 ? (
    <>
      <h1 className="text-3xl font-semibold text-black mb-4 text-center">Results</h1>
      <div className="overflow-y-auto scrollbar-hide h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchedCars.map((car, index) => (
            <div
              key={index}
              className="bg-[#5458ac14] p-2 flex items-center flex-col rounded-t-xl w-60"
            >
              <img
                src={car.image}
                className="w-[240px] h-[160px] object-cover rounded-t-xl"
              />
              <p className="font-bold">{car.name}</p>
              <p className="flex flex-row justify-center items-center gap-1 font-winky">
                <RiMoneyRupeeCircleFill color="#bcb009" />
                Price {car.price}
                <span className="text-[10px]">Lakh</span>
              </p>
              <div className="flex flex-row gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaGasPump className="text-green-600" />
                  <span>{car.fuel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCogs className="text-purple-600" />
                  <span>{car.transmission}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) :(

    

  

    <div className="w-full h-full flex justify-center items-center">
      <img
          src={pngCar}
          alt="car"
          className={`transition-all duration-500 ${carReverse ? "car-reverse-away" : ""}`}
        />
    </div>
  )}
</div>


        {/* Car animation image */}
       
      </div>
    </div>
  );
};
