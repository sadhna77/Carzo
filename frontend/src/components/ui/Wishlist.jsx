import React, { useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import axios from "axios";
import { CarCart } from "./CarCart";
import { toast } from "sonner";
import { FaGasPump, FaRoad, FaCogs } from "react-icons/fa";
import { MdOutlineOpenInNew } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

export const Wishlist = () => {
  const [loading, setLoading] = useState(false);
  const [Likeloading, setLikeLoading] = useState(true);
  const [likedCars, setLikedCars] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    setLoading(true);
    const getLikes = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/liked-byuser/${userId}`
        );

        setLikedCars(res.data.likedCars);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getLikes();
  }, []);

  console.log("liked", likedCars);

  return (
    <>
      <div className="h-screen flex flex-col font-winky">
        <Header />
        {/* Main Layout: Sidebar + Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="h-full">
            <Sidebar />
          </div>

          {/* Main Scrollable Content */}
          {/* Cars Grid */}

          {/* Main Scrollable Content */}
          {loading ? (
            <div className="flex flex-1 items-center justify-center">
  <ImSpinner2 className="text-4xl text-[#5459AC] animate-spin" />
</div>

          ) : (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid lg:grid-cols-4 gap-6 md:grid-cols-3 grid-cols-1">
                {likedCars.map((data, id) => (
                  <div
                    key={id}
                    className="w-full bg-white rounded-xl border shadow"
                  >
                    {/* Car Image */}
                    <img
                      src={data.image}
                      alt={data.name}
                      className="w-full h-40 object-cover rounded-t-xl"
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
                          <span>{data.fuel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaCogs className="text-purple-600" />
                          <span>{data.transmission}</span>
                        </div>
                      </div>

                      <div className="my-3 border-t border-gray-200" />

                      <div className="flex items-center justify-between">
                        <p className="text-base font-bold">
                          {data.price}
                          <span className="font-light p-1">Lakh</span>
                        </p>
                        <div className="flex flex-row gap-1.5 items-center">
                          <FaHeart color="red" />
                          <span className="text-sm">
                            {data.likes?.length || 0} Likes
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
