import React, { useEffect } from "react";
import { Header } from "./Header";
import { AdminLogin } from "./AdminLogin";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { AdminSign } from "./AdminSign";
import { useNavigate } from "react-router-dom";
import { Admindashboard } from "./Admindashboard";
import { FaUserGear } from "react-icons/fa6";
import { NewAddedCar } from "./NewAddedCar";
import { Sidebar } from "./Sidebar";
import BackgroundAdmin from "../../assets/BackgroundAdmin.jpg";

export const Admin = () => {
  const location = useLocation();
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const [shouldRefetch, setShouldRefetch] = useState(false);

  const handleSuccess = () => {
    console.log(shouldRefetch);

    setShouldRefetch((prev) => !prev);
  };

  const Logout = () => {
    const admin = JSON.parse(localStorage.getItem("admin"));

    console.log(admin);

    localStorage.removeItem("admin");
    setIsAdmin(false);
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setShowLogin(false);
    setShowSignup(false);
  };

  useEffect(() => {
    const admin = localStorage.getItem("admin");

    if (admin) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Header />

      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden bg-black">
        {/* Sidebar */}
        <div className="h-full">
          <Sidebar />
        </div>

        {/* Left Section - Black Background */}
        <div
          className={`h-screen bg-black text-white flex items-center justify-center ${
            isAdmin ? "w-0 hidden" : "w-1/2"
          }`}
        >
          {!isAdmin && (
            <div className="flex flex-col items-center">
              <h1 className="md:text-2xl text-sm mb-4 text-center font-winky">
                <span>Ready to drive your inventory?</span> <br />
                Add new cars, define features, and set prices to keep your
                listings up to date. <br />
                <span className="md:text-xl text-blue-400 text-[15px]">
                  Login here or Sign Up to begin.
                </span>
              </h1>
              <div className="flex gap-4 mt-4">
                <button
                  className="md:bg-green-600 md:text-white md:px-5 md:py-2 p-4 rounded-md hover:bg-green-700 md:text-sm text-[13px]  text-green-600 "
                  onClick={() => setShowLogin(true)}
                >
                  LogIn
                </button>
                <button
                  className="md:bg-green-600 md:text-white px-5 py-2 rounded-md hover:bg-green-700 text-green-600 md:text-sm text-[13px] "
                  onClick={() => setShowSignup(true)}
                >
                  Sign Up
                </button>
              </div>

              {showLogin && (
                <AdminLogin
                  onClose={() => setShowLogin(false)}
                  onLoginSuccess={handleLoginSuccess}
                />
              )}
              {showSignup && (
                <AdminSign
                  onClose={() => setShowSignup(false)}
                  onLoginSuccess={handleLoginSuccess}
                />
              )}
            </div>
          )}
        </div>

        {/* Right Section - Background Image */}
        {!isAdmin ? (
          // Show background image with ellipse when not logged in
          <div
            className="w-1/2 h-screen bg-cover bg-center bg-no-repeat overflow-hidden p-5 rounded-tl-[50%] "
            style={{
              backgroundImage: `url(${BackgroundAdmin})`,
            
            }}
          ></div>
        ) : (
          // Show dashboard when logged in
          <div className="w-full h-screen overflow-y-auto p-5 bg-white">
            <div className="flex items-center justify-center mt-8 flex-col">
              <button
                className="text-[#04a346] px-5 py-2 rounded-md font-medium hover:bg-[#6b8677] transition duration-200 float-end"
                onClick={() => Logout()}
              >
                <FaUserGear size={70} />
                Logout
              </button>
            </div>
            <Admindashboard onSuccessAdded={handleSuccess} />
            <NewAddedCar
              shouldRefetch={shouldRefetch}
              handleSuccess={handleSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
};
