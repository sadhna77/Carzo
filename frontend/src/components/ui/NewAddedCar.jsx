import React from "react";
import { useEffect, useState } from "react";
import { FaGasPump, FaRoad, FaCogs } from "react-icons/fa";
import { FaHeart, FaShareAlt, FaShoppingCart } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import Cardata from "../../../Data/Cardata";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import axios from "axios";

export const NewAddedCar = ({ shouldRefetch, handleSuccess }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [shouldRefetch, setShouldRefetch] = useState(false);

  // to fect newly added car 1 month before

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/fetchcars-new`
        );
        console.log("data new car", res.data);
        setCars(res.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [shouldRefetch]);

  const [carType, setCarType] = useState(false);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [carName, setCarName] = useState("");
  const [Editcar, setEditcar] = useState("");

  const EditCar = async (carId) => {
    try {
      const res = await axios.put(
       `${import.meta.env.VITE_API_BASE_URL}/api/edit-car/${carId}`,
        {
          type: carType,
          price,
          image,
          name: carName,
        }
      );

      toast.success("Deleted car successfully!", {
        duration: 2000,
      });
      handleSuccess();
      setEditcar(false);
    } catch (error) {
      toast.warning("Ooops Some error!", {
        duration: 2000,
      });
    }
  };
  const DeleteCar = async (carId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/edit-car/${carId}`
      );

      toast.success("Deleted car successfully!", {
        duration: 2000,
      });
      handleSuccess();
    } catch (error) {
      toast.warning("Ooops Some error!", {
        duration: 2000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-4xl bg-gradient-to-r from-green-900 to-green-400 bg-clip-text text-transparent mt-1 text-center font-winky animate-bounce ">
        {" "}
        Recentaly New Added Car
      </h1>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-15 md:m-8">
        {cars.map((car, id) => (
          <div
            key={id}
            className="bg-[#e2e2e9a9] rounded-2xl overflow-hidden hover:bg-[#f6f6f6] transition-shadow duration-300 w-75"
          >
            {/* Image */}
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover rounded-t-2xl 	hover:contrast-125"
            />

            {/* Info */}
            <div className="p-4">
              <div className="text-lg font-semibold text-gray-800 text-center capitalize ">
                {car.name}
              </div>
              <div className="w-16 h-1 bg-gray-200 my-2 rounded-full" />

              {/* Features */}
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <FaGasPump className="text-green-500" />
                  {car.fuel}
                </div>
                <div className="flex items-center gap-1">
                  <FaCogs className="text-orange-500" />
                  {car.transmission}
                </div>
              </div>

              {/* Price & Button */}
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold text-[#5459AC] flex items-center">
                  <RiMoneyRupeeCircleFill color="#bcb009" /> {car.price} Lakh
                </div>
                <button className="text-sm bg-[#5459AC] text-white px-3 py-1 rounded-full hover:bg-[#3f4193]">
                  View Details
                </button>
              </div>

              {/* Like, Share, Buy */}
              <div className="flex justify-around items-center px-4 py-2 border-t border-gray-200 mt-3">
                <button
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition"
                  onClick={() => DeleteCar(car._id)}
                >
                  <RiDeleteBin6Line />
                  <span className="text-sm">Delete</span>
                </button>

                <Popover open={Editcar} onOpenChange={setEditcar}>
                  <PopoverTrigger asChild>
                    <button
                      className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition
                            "
                    >
                      <FiEdit />

                      <span className="text-sm">Edit</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-4 bg-white  rounded-lg shadow-md  hover:border-green-600">
                    <h3 className="text-lg font-semibold mb-2 font-winky text-center">
                      Edit Car
                    </h3>
                    {/* Example form */}
                    <input
                      className="w-full mb-2 p-1 border rounded-lg focus:outline-none  focus:border-green-600"
                      placeholder="Car Name"
                      value={carName}
                      onChange={(e) => setCarName(e.target.value)}
                    />
                    <input
                      className="w-full mb-2 p-1 border rounded-lg focus:outline-none  focus:border-green-600"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                      className="w-full mb-2 p-1 border rounded-lg focus:outline-none  focus:border-green-600"
                      placeholder="Image"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                    {/* for cartype  */}
                    <Select onValueChange={(val) => setCarType(val)}>
                      <SelectTrigger className="w-full border border-gray-300  rounded-lg px-3 py-1 mt-1 text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-400">
                        <SelectValue placeholder="CarType" />
                      </SelectTrigger>
                      <SelectContent>
                        {Cardata.CarType.map((cartype, id) => (
                          <SelectItem key={id} value={cartype.type}>
                            {cartype.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-400 mt-3"
                      onClick={() => EditCar(car._id)}
                    >
                      Save
                    </button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
