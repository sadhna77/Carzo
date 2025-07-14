import React, { useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import axios from "axios";
import { CarCart } from "./CarCart";
import { toast } from "sonner";
import { ImSad } from "react-icons/im";
import { useNavigate } from "react-router-dom";

export const BoughtCar = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [NoBuy, setNoBuy] = useState(false);
  const [Refresh, setRefresh] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const RefreshHandle = ()=>{

    setRefresh(true)

  }

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
         `${import.meta.env.VITE_API_BASE_URL}/api/alreadyBuy-car`,
          { userId }
        );

     




        const boughtCars = res.data.boughtCars;
        if (
          Array.isArray(res.data) &&
          res.data.length === 0
        ) {
          // Do something if array is empty
          setNoBuy(true)
        }

        setCars(res.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [Refresh]);

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

          {NoBuy ? (
            <div className="mt-10 flex items-center justify-center h-1/2 w-full flex-col font-winky text-2xl font-bold  ">
              <ImSad size={50} />
              OOps No data{" "}
              <span
                onClick={() => navigate("/dashboard")}
                className="text-green-600 cursor-pointer font-winky text-sm"
              >
                Go To Shop
              </span>
            </div>
          ) : (
            <CarCart data={cars} onSuccess={RefreshHandle} />
          )}
        </div>
      </div>
    </>
  );
};
