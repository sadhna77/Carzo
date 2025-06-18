import React from "react";
import car from "../../assets/car.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SignUpModal } from "./SignupModal";
import { Login } from "./Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";

import Cardata from "../../../Data/Cardata";

export const Header2 = () => {
  const [profileIcon, setProfileIcon] = useState("");
  const [username, setUsername] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(""); // to show uploaded image if any

  // ----------------------------------------------------------------------------------------------------------------

  const navigate = useNavigate();
  const handleLoginSuccess = () => {
    setIsSignIn(true);
    setShowLogin(false);
    setShowSignup(false);
  };

  // profile icon ka color change krne k liye
  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = `hsl(${hash % 360}, 70%, 50%)`; // hsl gives good contrast and variation
    return color;
  };

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
      setProfileIcon(storedUsername.charAt(0).toUpperCase());
    }

    if (token) {
      setIsSignIn(true);
    }

    // ✅ load profileImageUrl from localStorage
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfileImageUrl(storedProfileImage);
    }
  }, []);

  return (
    <>
      <div className="sticky top-0 z-50 bg-white flex justify-between items-center shadow-sm p-3 font-winky">
        <div>
          <Link  to="/" className="flex items-center gap-2 cursor-pointer"><img src={car} alt="car" height={30} width={30} /></Link>
          <p className="font-merienda font-bold text-[#5459AC] ">CarZo</p>
        </div>

        <ul className="hidden md:flex gap-10">
          <li className="relative text-black hover:text-[#7379e9]  after:block after:h-[2px] after:bg-[#5459AC]  after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left after:w-full">
            <Link to="/dashboard">Home</Link>
          </li>

          <li className="relative text-black hover:text-[#5459AC]  after:block after:h-[2px] after:bg-[#5459AC]  after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left after:w-full">
            New{" "}
          </li>
          <li className="relative text-black hover:text-[#5459AC]  after:block after:h-[2px] after:bg-[#5459AC]  after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left after:w-full">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="flex gap-3">
          {isSignIn ? (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: stringToColor(username) }}
            >
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-2xl font-winky">
                  {profileIcon}
                </span>
              )}
            </div>
          ) : (
            <>
              <button
                className="bg-[#7379e9] text-white px-5 py-2 rounded-md font-medium hover:bg-[#5f65d6] transition duration-200"
                onClick={() => setShowLogin(true)}
              >
                LogIn
              </button>
              <button
                className="bg-[#7379e9] text-white px-5 py-2 rounded-md font-medium hover:bg-[#5f65d6] transition duration-200"
                onClick={() => setShowSignup(true)}
              >
                Sign Up
              </button>
            </>
          )}

          {showLogin && (
            <Login
              onClose={() => setShowLogin(false)}
              onLoginSuccess={handleLoginSuccess}
            />
          )}
          {showSignup && (
            <SignUpModal
              onClose={() => setShowSignup(false)}
              onLoginSuccess={handleLoginSuccess}
            />
          )}
        </div>
      </div>
    </>
  );
};
