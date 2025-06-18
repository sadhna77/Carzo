// src/pages/BuyCarDetails.jsx
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaGasPump, FaRoad, FaCogs } from "react-icons/fa";
import Cardata from "../../../Data/Cardata";
import { MdOpenInNew } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRef, useEffect } from "react";
import { IoStar } from "react-icons/io5";
import { Reviews } from "./Reviews";
import { Header2 } from "./Header2";
import axios from "axios";
import { toast } from "sonner";
import { ImSpinner3 } from "react-icons/im";

export const BuyCar = () => {
  const location = useLocation();
  const { car } = location.state || {};
  const { id } = useParams();
  const [show, setShow] = useState(false);

  console.log(car);

  // reviews starts and comments array hai ye
  const stars = [2, 4, 3, 1, 2, 2, 5, 4, 4, 3];
  const carReviews = [
    {
      name: "Neha",
      color: "pink",
      comment:
        "Absolutely love this car! Smooth drive, excellent mileage, and stylish looks .Great value for money. Comfortable seats and good road grip.",
    },
    {
      name: "Raj",
      color: "purple",
      comment: "Great value for money and smooth drive.",
    },
    {
      name: "Ankit",
      color: "green",
      comment:
        "Spacious interiors and good mileage. Looks premium from outside and feels good inside too. Good job by the brand. Mileage is decent, could have been slightly better. But features make up for it",
    },
    {
      name: "Priya",
      color: "blue",
      comment: "AC works perfectly, very happy with the car.",
    },
    {
      name: "Karan",
      color: "yellow",
      comment: "Engine power is great on highways.",
    },
    {
      name: "Simran",
      color: "black",
      comment: "Good design and premium feel.",
    },
    {
      name: "Amit",
      color: "orange",
      comment: "Customer support was excellent.",
    },
    {
      name: "Divya",
      color: "green",
      comment: "Infotainment system is very user-friendly.",
    },
    {
      name: "Sahil",
      color: "pink",
      comment: "Suspension is smooth on bad roads.",
    },
    {
      name: "Riya",
      color: "yellow",
      comment: "Nice car for city rides, easy parking.",
    },
  ];

  // real time m comment add krne k liye
  const [userComment, setUserComment] = useState("");
  const [allReviews, setAllReviews] = useState(carReviews);
  const [selectedStars, setSelectedStars] = useState(0);

  const username = localStorage.getItem("username") || "Guest";

  const handleAddComment = () => {
    if (!userComment.trim() || selectedStars === 0) return;

    const newReview = {
      name: username,
      color: "gray",
      comment: userComment,
      stars: selectedStars,
    };

    setAllReviews((prev) => [newReview, ...prev]);
    setUserComment("");
    setSelectedStars(0);
  };

  const [checkedTypes, setCheckedTypes] = useState({});
  const [checkedFeatureTypes, setcheckedFeatureType] = useState({});
  const FeatureList = [
    "Oldcar",
    "Smart Sensors",
    "Alloy Wheels",
    "Touchscreen Infotainment",
    "Reverse Camera",
    "Sunroof",
  ];

  const handleCheckChange = (type, value) => {
    setCheckedTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleFeatureCheck = (type, value) => {
    setcheckedFeatureType((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // function to confirm user waant to buy car
  const [buyerName, setbuyerName] = useState("");
  const [contact, setcontact] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [loading, setLoading] = useState(false);

  const emi = "EMI Option";
  const fullpay = "Full Payment";
  const carname = car.name;
  const carId = car._id;
  const userId = localStorage.getItem("userId");

  const confirmBuy = async () => {
    setLoading(true);
    const payMethod = Object.keys(checkedTypes).filter(
      (key) => checkedTypes[key]
    );
    const feature = Object.keys(checkedFeatureTypes).filter(
      (key) => checkedFeatureTypes[key]
    );
    try {
      const res = await axios.post(
        `http://192.168.0.102:5001/api/buy-car/${carId}`,
        {
          userId,
          email,
          username,
          carname,
          payMethod,
          feature,
        }
      );
      console.log(res.data);

      setLoading(false);

      toast.success("Information added successfully!", {
        duration: 2000,
      });

      setShow(false);
      setcontact("");
      setemail("");
      setaddress("");
      setCheckedTypes("");
    } catch (error) {
      toast.error("Server Error", {
        duration: 2000,
      });
    }
  };

  const buySectionRef = useRef(null); // 🔸 reference for scroll target

  useEffect(() => {
    if (show && buySectionRef.current) {
      buySectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [show]);

  //   cartype ka icon select krne k liye
  const carsOfType = Cardata.carTypes2.find(
    (cardata) => cardata.type === car.type
  );

  if (!car) {
    return <div className="text-center p-10">Car data not available</div>;
  }

  return (
    <div className=" bg-[#f4f3f9]">
      <Header2 />

      <div className=" p-6 font-winky ">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-130 object-cover rounded-xl mb-6 "
        />
        <h1 className="text-3xl font-bold text-[#16068b] mb-2">{car.name}</h1>
        <p className="text-xl font-semibold text-gray-700 mb-4 flex gap-1 items-center">
          {" "}
          <RiMoneyRupeeCircleFill color="#bcb009" />
          {car.price} Lakh
        </p>

        <div className="grid grid-cols-2 gap-6 text-gray-600 ">
          <div className="flex gap-3 items-center">
            {" "}
            <FaRoad className="text-blue-500 " /> Mileage: {car.mileage}
          </div>
          <div className="flex gap-3 items-center">
            {" "}
            <FaGasPump className="text-green-500" />
            Fuel Type: {car.fuel}
          </div>
          <div className="flex gap-3 items-center">
            {" "}
            <FaCogs className="text-orange-500" />
            Transmission: {car.transmission}
          </div>
          <div className="flex items-center h-10 w-10 gap-4 mr-4">
            {carsOfType.icon} <h2>{carsOfType.type}</h2>{" "}
          </div>
        </div>

        <Separator className="bg-amber-600 mt-10" />

        <div className="flex  items-center gap-10 justify-between">
          <button
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full"
            onClick={() => setShow(true)}
          >
            Proceed to Buy
          </button>
          <h1 className="text-2xl font-winky  text-[#16068b] mt-6 ">
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(
                car.name + " car details"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-[#8b1506] flex gap-1 items-center"
            >
              Know More <MdOpenInNew color="blue" />
            </a>
          </h1>
        </div>

        {/* {show && (
      
      )} */}

        {show && (
          <div>
            <div
              ref={buySectionRef}
              className="mt-10  p-6 rounded-xl hover:border-blue-950  grid grid-cols-1 md:grid-cols-2"
            >
              <div>
                <h2 className="text-xl font-semibold text-[#16068b] mb-4">
                  Confirm Your Purchase
                </h2>
                <p className="text-lg text-gray-700 ">
                  Car: <strong>{car.name}</strong>
                </p>
                <p className="text-lg text-gray-700 ">
                  Price: <strong>₹ {car.price} Lakh</strong>
                </p>
              </div>

              <div className=" rounded-xl mt-4 md:mt-0 md:ml-30 ">
                <h2 className="text-xl font-bold mb-4 text-[#16068b]">
                  Select Payment Option
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="emi"
                      className="data-[state=checked]:bg-[#8b1506] border-blue-500"
                      checked={checkedTypes[emi] || false}
                      onCheckedChange={(value) => handleCheckChange(emi, value)}
                    />
                    <Label htmlFor="emi">EMI Option</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="full"
                      className="data-[state=checked]:bg-[#8b1506] border-blue-500"
                      checked={checkedTypes[fullpay] || false}
                      onCheckedChange={(value) =>
                        handleCheckChange(fullpay, value)
                      }
                    />
                    <Label htmlFor="full">Full Payment</Label>
                  </div>
                </div>
              </div>

              <div className="mt-10  rounded-xl space-y-4">
                <h2 className="text-xl font-bold text-[#16068b]">
                  Enter Buyer Details
                </h2>

                <input
                  type="text"
                  placeholder="Your Name"
                  className="border p-2 w-full rounded"
                  value={buyerName}
                  onChange={(e) => setbuyerName(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="border p-2 w-full rounded"
                  value={contact}
                  onChange={(e) => setcontact(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Phone Email"
                  className="border p-2 w-full rounded"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Give address"
                  className="border p-2 w-full rounded"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                />
                <button
                  className="mt-4 bg-[#8b1506] text-white px-6 py-2 rounded-full hover:bg-[#700f04]"
                  onClick={() => confirmBuy(car._id)}
                  disabled={loading}
                >
                  {loading ? <ImSpinner3 color="white" /> : "Submit Request"}
                </button>
              </div>

              <div className="mt-10  rounded-xl space-y-4 md:ml-30 ">
                <h1 className="text-xl font-bold text-[#16068b]">
                  Feature Preferences
                </h1>
                {FeatureList.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={checkedFeatureTypes[feature] || false}
                      onCheckedChange={(value) =>
                        handleFeatureCheck(feature, value)
                      }
                      className="data-[state=checked]:bg-[#8b1506] border-blue-500"
                    />
                    <Label
                      htmlFor={`check-${feature}`}
                      className="text-[#040746] font-medium"
                    >
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* user reviews   */}

        <div className="p-3 text-3xl mt-10">
          <div className="flex gap-4">
            <h1>People Reviews</h1>
            <div className="h-10 w-70  text-yellow-400  flex gap-1">
              {" "}
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar className="text-yellow-400 text-3xl animate-bounce" />
            </div>
          </div>
        </div>

        <textarea
          placeholder="Write your review..."
          rows="4"
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <div className="flex gap-1 mb-2 text-yellow-500 text-2xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <IoStar
              key={star}
              className={`cursor-pointer ${
                selectedStars >= star ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setSelectedStars(star)}
            />
          ))}
        </div>

        <button
          onClick={handleAddComment}
          className="mt-4 bg-[#050b66] text-white px-6 py-2 rounded-full hover:bg-[#7dcedf] float-right"
        >
          Submit Review
        </button>

        <Reviews stars={stars} carReviews={allReviews} />
      </div>
    </div>
  );
};
