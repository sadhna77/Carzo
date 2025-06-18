import React from "react";
import car from "../../assets/car.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SignUpModal } from "./SignupModal";
import { Login } from "./Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
import { GrCloudUpload } from "react-icons/gr";
import { TiThMenu } from "react-icons/ti";
import { Button } from "@/components/ui/button";
import { MdWavingHand } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Cardata from "../../../Data/Cardata";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation } from "react-router-dom";

export const Header = ({ setFilteredCars }) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const location = useLocation();
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [profileIcon, setProfileIcon] = useState("");
  const [username, setUsername] = useState("");
  const [openMenu, setOpenMenu] = useState(true);

  //  for user profile const
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(""); // to show uploaded image if any











  // to upload profile pic 
  const handleUploadProfile = async () => {
    if (!selectedFile) return;

    const email = localStorage.getItem("email");
    const formData = new FormData();
    formData.append("profile", selectedFile);
    formData.append("email", email); // ✅ add email properly

    try {
      const res = await axios.post(
        "http://localhost:5001/api/uploadProfile",
        formData
      );
      setProfileImageUrl(res.data.imageUrl);
      const uploadedUrl = res.data.imageUrl;

      localStorage.setItem("profileImage", uploadedUrl); // ✅ correct
      console.log(res.data);
      toast.success("Profile uploaded successfully!");
      setShowUpload(false);
    } catch (error) {
      console.error(error);
      toast.error("Upload failed!");
    }
  };

  // things for searching car
  const [showPopover, setShowPopover] = useState(false);
  const [price, setPrice] = useState([5]);
  const [carName, setCarName] = useState("");
  const [carType, setCarType] = useState("");
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  //  Send to backend on Search click
  const handleSearch = async () => {
    setLoading(true);
    setNotFound(false);
    try {
      const response = await axios.post(
        "http://192.168.0.102:5001/api/search",
        {
          name: carName,
          price: price[0],
          type: carType,
        }
      );

      const searchedCars = await response.data.data;
      setLoading(false);
      setFilteredCars(searchedCars);
      if (searchedCars.length === 0) {
        setNotFound(true);
      }
      console.log("Search Results:", searchedCars);
      setShowPopover(false);
    } catch (error) {
      console.error("Error sending search data:", error);
    }
  };

  // ----------------------------------------------------------------------------------------------------------------
  // agr user logged in nhi to
  const navigate = useNavigate();

  const handleGoDashboard = () => {
    const isLoggedIn = localStorage.getItem("authtoken");

    if (!isLoggedIn) {
      toast.warning("Please login first to view Dashboard.!!", {
        duration: 2000, // 4000 milliseconds = 4 seconds
      });
    } else {
      navigate("/dashboard");
    }
  };

  const handleLoginSuccess = () => {
    console.log("hoooooooo");
    setIsSignIn(true);
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
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img src={car} alt="car" height={30} width={30} />
          </Link>
          <p className="font-merienda font-bold text-[#5459AC] ">CarZo</p>{" "}
        </div>

        <ul className="hidden md:flex gap-10">
          <li
            onClick={handleGoDashboard}
            className="cursor-pointer relative text-black hover:text-[#7379e9] after:block after:h-[2px] after:bg-[#5459AC] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left after:w-full"
          >
            DashBoard
          </li>
          <li className="cursor-pointer relative text-black hover:text-[#7379e9] after:block after:h-[2px] after:bg-[#5459AC] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left after:w-full">
            <Link to="/"> Home</Link>
          </li>

          {isSignIn && location.pathname == "/dashboard" && (
            <div className="relative inline-block">
              {/* Search Item */}
              <li
                onClick={() => setShowPopover(!showPopover)}
                className="cursor-pointer relative text-black hover:text-[#5459AC] after:block after:h-[2px] after:bg-[#5459AC] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left after:w-full"
              >
                Search
              </li>

              {/* Popover Box */}
              {showPopover && (
                <div className="absolute z-50 mt-2 w-72 bg-white shadow-lg rounded-xl p-4 space-y-3 border border-gray-300">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Car Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter car name"
                      value={carName}
                      onChange={(e) => setCarName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-1 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#5459AC]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price Range (in Lacs)
                    </label>
                    <Slider
                      defaultValue={[5]}
                      max={100}
                      min={1}
                      step={1}
                      value={price}
                      onValueChange={(val) => setPrice(val)}
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      Selected Price: ₹{price[0]}L
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Car Type
                    </label>
                    <Select onValueChange={(val) => setCarType(val)}>
                      <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-1 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#5459AC]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Cardata.CarType.map((cartype, id) => (
                          <SelectItem key={id} value={cartype.type}>
                            {cartype.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <button
                    onClick={handleSearch}
                    className="mt-2 bg-[#5459AC] text-white px-4 py-1 rounded-lg hover:bg-[#3f4398]"
                  >
                    Search Now
                  </button>
                  <button
                    onClick={() => setShowPopover(false)}
                    className="mt-2 text-[#5459AC] px-4 py-1 rounded-lg hover:text-[#f28585]"
                  >
                    Back
                  </button>
                  {loading && (
                    <div className="flex justify-center items-center ">
                      <ImSpinner2 className="text-4xl text-[#5459AC] animate-spin" />
                    </div>
                  )}
                  {notFound && (
                    <div className="text-center text-gray-500 text-xl font-semibold mt-20">
                      No Cars Found
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <li
            onClick={() => navigate("/contact")}
            className="cursor-pointer relative text-black hover:text-[#7379e9] after:block after:h-[2px] after:bg-[#5459AC] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left after:w-full"
          >
            Contact
          </li>
        </ul>

        {/* ============================================================================================================ */}

        {isSignIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="md:hidden active:bg-[#c6c7de80] rounded-full flex items-center justify-center h-12 w-12"
                variant="ghost"
              >
                <TiThMenu size={35} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>
                {isSignIn ? (
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <img
                      src={profileImageUrl || null}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="font-winky font-bold text-xl">Hey</p>
                    <MdWavingHand color="#c6c18e" size={20} />

                    <p>{username}</p>
                  </div>
                ) : (
                  <div>Hey there.....</div>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem>
                  <Link to="/">Home</Link>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem>
                  <Link to="/bought">Bought</Link>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem>
                  <Link to="/new">New</Link>
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem>
                  <Link to="/contact">Contact</Link>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className=" md:hidden ">
            <button
              className=" text-[#7379e9] px-5 py-2 rounded-md font-medium active:text-white "
              onClick={() => setShowLogin(true)}
            >
              LogIn
            </button>
            <button
              className=" text-[#7379e9]  px-5 py-2 rounded-md font-medium  active:text-white"
              onClick={() => setShowSignup(true)}
            >
              Sign Up
            </button>
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
        )}

        {/* =========================================================================================================== */}

        <div className="md:flex gap-3 hidden ">
          {isSignIn ? (
            <Popover open={showUpload} onOpenChange={setShowUpload}>
              <PopoverTrigger asChild>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                  style={{ backgroundColor: stringToColor(username) }}
                >
                  {profileImageUrl ? (
                    <Tooltip>
                      <TooltipTrigger>
                        <img
                          src={profileImageUrl}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Upload Profile Image </p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="text-white text-2xl font-winky">
                          {profileIcon}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Upload Profile Image </p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4 mr-15 bg-[#dcdde7]  flex flex-col">
                <label
                  htmlFor="upload-photo"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <GrCloudUpload className="text-3xl  hover:text-[#3f4398]" />
                  <span className="text-sm mt-1 text-gray-600">
                    Upload Profile picture
                  </span>
                </label>
                <input
                  id="upload-photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="hidden"
                />
                <button
                  className="bg-[#5459AC] text-white px-3 py-1 rounded hover:bg-[#3f4398] mt-1 cursor-pointer"
                  onClick={handleUploadProfile}
                  disabled={!selectedFile}
                >
                  Upload
                </button>
              </PopoverContent>
            </Popover>
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
