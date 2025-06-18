import React, { useState } from "react";
import {
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
  FaCarSide,
  FaBalanceScale,
  FaPhoneAlt,
  FaBars,
} from "react-icons/fa";

import { GiSteeringWheel } from "react-icons/gi";
import { MdCategory } from "react-icons/md";
import { BsLayoutTextSidebar } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { GrUserAdmin } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logOut = () => {
    console.log("User logged out");
    localStorage.removeItem("authtoken");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("profileImage");
    localStorage.removeItem("admin");
    localStorage.removeItem("userId");
    localStorage.removeItem("carId");

    navigate("/");
  };

  const menuItems = [
    { label: "Profile", icon: <RiAdminFill />, path: "/profile" },
    { label: "Wishlist", icon: <FaHeart />, path: "/wishlist" },
    { label: "Already Bought", icon: <FaShoppingCart />, path: "/bought" },
    
    
    { label: "Contact Us", icon: <FaPhoneAlt />, path: "/contact" },
    { label: "Admin", icon: <GrUserAdmin />, path: "/admin" },
  ];

  return (
    <div
      style={{ height: "90dvh" }}
      className={`bg-[#5459AC] text-white p-4 flex flex-col justify-between transition-all duration-300 
        ${isOpen ? "w-50" : "w-16"} 
      `}
    >
      {/* Toggle Button */}
      <div>
        <button onClick={() => setIsOpen(!isOpen)} className="hidden md:block mb-6 text-xl">
          <BsLayoutTextSidebar className="text-2xl transition-transform duration-300 active:-translate-x-2" />
        </button>

        {/* Menu Items */}
        <div className="flex flex-col gap-5 ">
          {menuItems.map((item) => (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-3 cursor-pointer hover:text-[#c0c3ff] transition"
            >
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div
        className="flex items-center gap-3 cursor-pointer hover:text-red-200 mt-10"
        onClick={logOut}
      >
        <FaSignOutAlt />
        {isOpen && <span className="hidden md:inline">Logout</span>}
      </div>
    </div>
  );
};
