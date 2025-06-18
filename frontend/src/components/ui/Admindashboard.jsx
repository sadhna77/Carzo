import React from "react";
import { RiAddCircleLine } from "react-icons/ri";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaGasPump, FaRoad, FaCogs } from "react-icons/fa";
import { FaHeart, FaShareAlt, FaShoppingCart } from "react-icons/fa";
import Cardata from "../../../Data/Cardata";
import { MdOpenInNew } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRef, useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { Reviews } from "./Reviews";
import { Header2 } from "./Header2";
import axios from "axios";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";

export const Admindashboard = ({onSuccessAdded}) => {
  const [show, setShow] = useState(false);
  const [carType, setCarType] = useState("");
  const [transmission, setTransmissionType] = useState("");
  const [fuel, setFuelType] = useState("");
  const [mileage, setMileage] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [carName, setCarName] = useState("");
  const buySectionRef = useRef(null);

  useEffect(() => {
    if (show && buySectionRef.current) {
      buySectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [show]);

  const [checkedTypes, setCheckedTypes] = useState({});

  const handleCheckChange = (type, value) => {
    setCheckedTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  //  send to backend
  const mutation = useMutation({
    mutationFn: async ({
      carName,
      mileage,
      price,
      fuel,
      transmission,
      carType,
      image,
      feature,
    }) => {
      console.log(
       image
        
      );
      const res = await axios.post("http://192.168.0.102:5001/api/add-car", {
        name: carName,
        mileage,
        price,
        fuel,
        transmission,
        type: carType,
        image,
        feature,
      });

      return res.data; // axios me .data milta hai response me
    },
    onSuccess: (data) => {
      onSuccessAdded();
      toast.success("Car added successfully!", {
        duration: 2000,
      });

      setCarName("")
      setPrice("")
      setImage("")
      setTransmissionType("")
      setCheckedTypes("")
      setMileage("")
      setFuelType("")
      setCarType("")
      
    },
    onError: (error) => {
      console.error(
        "some error",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message, {
        duration: 2000, // 4000 milliseconds = 4 seconds
      });
    },
  });

  // handling mutation function
  const handleSubmit = () => {
    const selectedFeatures = Object.keys(checkedTypes).filter(
      (key) => checkedTypes[key]
    );

    mutation.mutate({
      carName,
      mileage,
      price,
      fuel,
      transmission,
      carType,
      image,
      feature: selectedFeatures,
    });
  };

  const FeatureList = [
    "Air Conditioning",

    "ABS (Anti-lock Braking System)",
    "Airbags",

    "Sunroof / Moonroof",
    "Rear Parking Sensors",
    "Reverse Camera",
    "Touchscreen Infotainment",
    "Bluetooth Connectivity",

    "Alloy Wheels",

    "Leather Seats",

    "Wireless Charging",

    "Hill Assist",

    "Voice Command",

    "Tyre Pressure Monitoring System (TPMS)",
  ];

  const fuelTypes = [
    "Petrol",
    "Diesel",
    "CNG",
    "Electric",
    "Hybrid (Petrol + Electric)",
    "Hybrid (Diesel + Electric)",
    "LPG",
    "Hydrogen Fuel Cell",
  ];

  const transmissionTypes = [
    "Manual",
    "Automatic",
    "Semi-Automatic",
    "CVT (Continuously Variable Transmission)",
    "Dual-Clutch Transmission (DCT)",
    "Tiptronic",
    "AMT (Automated Manual Transmission)",
  ];

  const CarType = [
    { id: 1, type: "SUV" },
    { id: 2, type: "Sedan" },
    { id: 3, type: "Hatchback" },
    { id: 4, type: "Coupe" },
    { id: 5, type: "Convertible" },
    { id: 6, type: "Pickup Truck" },
    { id: 7, type: "MPV" },
    { id: 8, type: "Crossover" },
    { id: 9, type: "Luxury" },
    { id: 10, type: "Electric" },
  ];

  return (
    <div  className=" hover:bg-green-50 border hover:border-green-300 rounded-xl m-8  text-green-800">
      <div>
        <h2 className="text-2xl font-bold text-black flex items-center gap-2 p-5 justify-center">
          {" "}
          <RiAddCircleLine color="black"  size={40} onClick={() => setShow(!show)} />
          Add Car Details and Feature to Post it In Market
        </h2>
        {show && (
          <div>
            <div
              ref={buySectionRef}
              className="mt-10  p-6 rounded-xl hover:border-blue-950  grid grid-cols-1 md:grid-cols-2"
            >
              <div className=" rounded-xl space-y-4">
                <h2 className="text-xl font-bold text-[#16068b]">
                  Add CarName
                </h2>
                <input
                  type="text"
                  placeholder="Car Name"
                 className="border p-2 w-full rounded focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-400"
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
                />

                {/* for cartype  */}
                <Select onValueChange={(val) => setCarType(val)}>
                  <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-1 mt-1 text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-400">
                    <SelectValue placeholder="CarType" />
                  </SelectTrigger>
                  <SelectContent>
                    {CarType.map((cartype, id) => (
                      <SelectItem key={id} value={cartype.type}>
                        {cartype.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* for transmission type  */}
                <Select onValueChange={(val) => setTransmissionType(val)}>
                  <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-1 mt-1 text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-400">
                    <SelectValue placeholder="Transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    {transmissionTypes.map((transmission, id) => (
                      <SelectItem key={id} value={transmission}>
                        {transmission}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* for fuel type  */}
                <Select onValueChange={(val) => setFuelType(val)}>
                  <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-1 mt-1 text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-400">
                    <SelectValue placeholder="Fuel Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map((fuel, id) => (
                      <SelectItem key={id} value={fuel}>
                        {fuel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input
                  type="text"
                  placeholder="mileage (kml)"
                  className="border p-2 w-full rounded focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-400"
                  value={mileage}
                  onChange={(e) => setMileage(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="price"
                  className="border p-2 w-full rounded focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-400"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <input
                  type="text"
                  placeholder="image"
                  className="border p-2 w-full rounded focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-400"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>

              <div className="md:ml-30 ml-0">
                {" "}
                <div className="rounded-xl space-y-4 md:ml-30 ">
                  <h1 className="text-xl font-bold text-[#16068b]">
                    Feature Preferences
                  </h1>
                  {FeatureList.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={feature}
                        checked={checkedTypes[feature] || false}
                        onCheckedChange={(value) =>
                          handleCheckChange(feature, value)
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
                  <button
              onClick={handleSubmit}
              className="bg-green-900 hover:bg-green-400 text-white px-4 py-2 rounded-lg float-end"
            >
              Add Details
            </button>
            </div>

        
          </div>
        )}
      </div>
    </div>
  );
};
