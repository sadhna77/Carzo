import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaGasPump, FaRoad, FaCogs } from "react-icons/fa";
import { FaHeart, FaShareAlt, FaShoppingCart } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import axios from "axios";

export const DataContent = ({ searchedCars = [] }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Likeloading, setLikeLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const [likedCars, setLikedCars] = useState({});

  // Example in useEffect()
  useEffect(() => {
    setLoading(true);

    fetch("http://192.168.0.102:5001/api/fetchcars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setLoading(false); // Stop loading
      });
  }, []);

  const displayCars = searchedCars.length > 0 ? searchedCars : cars;
  const carTypes = [...new Set(displayCars.map((car) => car.type))];

  //  ab buy krne k liye function

  const BuyCar = (car) => {
    navigate(`/buycar/${car.name}`, { state: { car } });
  };

  // ----------------------------------------------------------------------------------------------

  const userId = localStorage.getItem("userId");
  const [refreshLikesCount, setrefreshLikesCount] = useState(false);

  const handleLike = async (carId) => {
    const alreadyLiked = likedCars[carId]; // current state se dekho liked hai ya nahi
    setrefreshLikesCount(true);
    const newLiked = !alreadyLiked; // toggle karo javascript m !undefined true hota h

    // UI me turant change dikhane ke liye state update karo
    setLikedCars((prev) => ({
      ...prev,
      [carId]: newLiked,
    }));

    console.log("ye", likedCars);

    console.log("Sending like to backend:", {
      carId,
      userId,
      likedCars: newLiked,
    });

    try {
      const res = await axios.put(`http://192.168.0.102:5001/api/liked-car`, {
        carId,
        userId,
        likedCars: newLiked,
      });

      setrefreshLikesCount(false);
    } catch (error) {
      console.log("Error:", error);

      // Rollback if needed
      setLikedCars((prev) => ({
        ...prev,
        [carId]: alreadyLiked,
      }));
    }
  };

  //  count ko bhi immediatly upgrade krne k liye cars dobara set krna pdega
  useEffect(() => {
    setLikeLoading(true);
    const getLikes = async () => {
      try {
        const res = await axios.get(
          `http://192.168.0.102:5001/api/liked-byuser/${userId}`
        );

        const likedCarArray = res.data.likedCars; // [{ _id, carId, carname }]

        const likedObj = {};
        likedCarArray.forEach((car) => {
          likedObj[car._id] = true;
        });
        setLikedCars(likedObj);

        setLikeLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getLikes();
  }, []);

  // --------------------------------------------------------------------------------------------------

  // to share cars
  const shareCar = (car) => {
    const url = `http:///192.168.0.102:5001/cars/${car._id}`;
    if (navigator.share) {
      navigator.share({
        title: `Check out ${car.name}`,
        text: `Look at this amazing car!`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <ImSpinner2 className="text-4xl text-[#5459AC] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 font-winky">
      {carTypes.map((type) => {
        const carsOfType = displayCars.filter((car) => car.type === type);

        return (
          <div key={type}>
            {/* Category Heading */}
            <h2 className="text-2xl font-bold text-[#4c4cb2] mb-4 ">
              {" "}
              Explore {type}
            </h2>

            {/* Cars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {carsOfType.map((car, id) => (
                <div
                  key={id}
                  className="bg-[#e2e2e9a9] rounded-2xl overflow-hidden hover:bg-[#f6f6f6] transition-shadow duration-300"
                >
                  {/* Image */}
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover rounded-t-2xl 	hover:contrast-125"
                  />

                  {/* Info */}
                  <div className="p-4">
                    <div className="text-lg font-semibold text-gray-800 capitalize">
                      {car.name}
                    </div>
                    <div className="w-16 h-1 bg-gray-200 my-2 rounded-full" />

                    {/* Features */}
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <FaRoad className="text-blue-500" />
                        {car.mileage}
                      </div>
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
                        <RiMoneyRupeeCircleFill color="#bcb009" /> {car.price}{" "}
                        Lakh
                      </div>
                      <button className="text-sm bg-[#5459AC] text-white px-3 py-1 rounded-full hover:bg-[#3f4193]">
                        <a
                          href={`https://www.google.com/search?q=${encodeURIComponent(
                            car.name + " car details"
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=" hover:text-[#8b1506] flex gap-1 items-center"
                        >
                          View Details
                        </a>
                      </button>
                    </div>

                    {/* Like, Share, Buy */}
                    <div className="flex justify-around items-center px-4 py-2 border-t border-gray-200 mt-10">
                      {!Likeloading && (
                        <button
                          onClick={() => handleLike(car._id, id)}
                          className={`flex items-center gap-2  cursor-pointer ${
                            likedCars[car._id]
                              ? "text-red-500"
                              : "text-gray-600"
                          }`}
                        >
                          <FaHeart
                            className={` ${
                              likedCars[car._id] ? "scale-130" : "scale-100"
                            }`}
                          />
                          <span className="text-sm">
                            {car.likes?.length || 0} Likes
                          </span>
                        </button>
                      )}

                      <button
                        onClick={() => shareCar(car)}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition"
                      >
                        <FaShareAlt />
                        <span className="text-sm">Share</span>
                      </button>
                      <button
                        className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition
                      "
                        onClick={() => BuyCar(car)}
                      >
                        <FaShoppingCart />
                        <span className="text-sm">Add to Buy</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
