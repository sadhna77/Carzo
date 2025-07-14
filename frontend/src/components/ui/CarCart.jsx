import React from "react";
import defaultcar from "../../assets/defaultcar.jpg";
import { FaGasPump, FaRoad, FaCogs, FaHeart, FaShareAlt, FaShoppingCart } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "sonner";

export const CarCart = ({ data,onSuccess }) => {
  
      const deleteCars = async (carId) => {
        // setLoading(true);
        try {
          const res = await axios.delete(
           `${import.meta.env.VITE_API_BASE_URL}/api/delete/${carId}`,
            
          );
          toast.success("order Cancelled Successfully")
          onSuccess();

        } catch (error) {
          console.log("error", error);
        } finally {
          // setLoading(false);
        }
      };
  
     



  return (
    <>
      <div className="w-full px-4 py-2 overflow-y-auto">
        <h2 className="text-2xl font-bold text-[#5459AC] mb-4 text-center font-winky">
          🏁 Your Bought Car List
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((car, index) => (
            <div
              key={index}
              className="bg-[#e2e2e9a9] h-90 rounded-2xl overflow-hidden hover:bg-[#f6f6f6] transition-shadow duration-300"
            >
              {/* Image */}
              <img
                src={car.carId.image}
                alt=""
                className="w-full h-48 object-cover rounded-t-2xl hover:contrast-125"
              />

              {/* Info */}
              <div className="p-4">
                <div className="text-lg font-semibold text-gray-800 capitalize">
                  {car.carname}
                  <p className="text-[10px] text-green-500"> Order Date : {new Date(car.createdAt).toLocaleString()}</p>
                </div>
                <div className="w-16 h-1 bg-gray-200 my-2 rounded-full" />

                {/* Features */}
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <FaGasPump className="text-green-500" />
                    {car.carId.fuel}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCogs className="text-orange-500" />
                    {car.carId.transmission}
                  </div>
                </div>

                {/* Price & Button */}
                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold text-[#5459AC] flex items-center">
                    <RiMoneyRupeeCircleFill color="#bcb009" />
                    {car.carId.price}{" "}
                    <span className="font-winky text-sm pl-1 text-black">Lakh</span>
                  </div>
                  
                  <div className="md:flex md:gap-1.5"><button className="text-sm md:bg-[#5459AC] md:text-white text-green-900 px-3 py-1 rounded-full hover:bg-[#3f4193]">
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(
                        car.carId.name + " car details"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#8b1506] flex gap-1 items-center"
                    >
                      View Details
                    </a>
                  </button>
                  <button className="text-sm md:bg-[#8b1506] md:text-white  text-red-700 px-3 py-1 rounded-full active:bg-[#3f4193]"
                  onClick={()=>deleteCars(car._id)}>
                    Cancel
                  </button></div>
                </div>

              
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
