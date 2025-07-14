import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LuSearch } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import Cardata from "../../../Data/Cardata";
import { useState } from "react";
import axios from "axios";

export const Search = ({ onSearchComplete }) => {
  const [price, setPrice] = useState([5]);
  const [carName, setCarName] = useState("");
  const [carType, setCarType] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [searchedCars, setSearchedCars] = useState("");

  // 🔥 Send to backend on Search click
  const handleSearch = async () => {
    console.log("clicked");

    setLoading(true);
    setNotFound(false);
    try {
      const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/search`,
        {
          name: carName,
          price,
          type: carType,
        }
      );

      const Cars = await response.data.data;
      setLoading(false);
      onSearchComplete(Cars);
      setSearchedCars(Cars);

      console.log("Search Results:", Cars);
      if (Cars.length===0) {
            
        setNotFound(true)
      


        
      }
    } catch (error) {
      console.error("Error sending search data:", error);
    }
  };

  return (
    <div className="p-5 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row gap-5 px-5 md:items-center w-full md:w-max font-winky">
      <Select onValueChange={(val) => setCarType(val)}>
        <SelectTrigger className="w-[180px] focus:outline-none focus:ring-0 border-none shadow-none font-winky">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="font-winky">
          {Cardata.CarType.map((cartype, id) => (
            <SelectItem key={id} value={cartype.type}>
              {cartype.type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="hidden sm:block" />
      <div>
        <input
          type="text"
          placeholder="Enter car name"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
          className="w-50 border rounded-lg px-3  py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#5459AC]"
        />
      </div>

      <Separator orientation="vertical" className="hidden sm:block" />
      <Select onValueChange={(val) => setPrice(val)}>
        <SelectTrigger className="w-[180px] focus:outline-none focus:ring-0 border-none shadow-none">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent className="font-winky">
          {Cardata.Pricing.map((pricing, id) => (
            <SelectItem key={id} value={pricing.range}>
              {pricing.range}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex justify-center md:justify-start w-full md:w-auto ">
        <button
          className="bg-[#5459AC] active:bg-[#8b8db0]  h-10 w-10 rounded-full flex items-center justify-center text-white"
          onClick={() => handleSearch()}
        >
          <LuSearch />
        </button>
      </div>
    </div>
  );
};
