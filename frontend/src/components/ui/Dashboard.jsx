import React from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import { FaGasPump, FaRoad, FaCogs } from "react-icons/fa";
import { FaHeart, FaShareAlt, FaShoppingCart } from "react-icons/fa";
import { DataContent } from "./DataContent";

export const Dashboard = () => {
  const [cars, setCars] = useState([]);


    const [filteredCars, setFilteredCars] = useState([]);
    // header page se searched car prop k through yaha aaega and then yaha se datacontent m



  // Example in useEffect()
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/fetchcars`)
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Header setFilteredCars={setFilteredCars}  />
      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="h-full">
      <Sidebar />
    </div>

        {/* Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
          {/* Your dashboard content here */}
          <h1 className="text-2xl font-bold mb-4">Dashboard Content</h1>

          {/* Example: Many Cars */}
          <DataContent searchedCars={filteredCars}/>

        </div>
      </div>
    </div>
  );
};
