import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useEffect } from "react";
import axios from "axios";
import { AiTwotoneEdit } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";
import { FiPlusCircle } from "react-icons/fi";
import { toast } from "sonner";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import carAdmin from "../../assets/carAdmin.jpg";
import { Input } from "@/components/ui/input";
import { FaCheckCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Profile = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("");
  const [fullname, setfullname] = useState(false);
  const [Email, setEmail] = useState(false);
  const [Address, setAddress] = useState(false);
  const [Age, setAge] = useState(false);
  const [userName, setuserName] = useState(false);
  const [Tele, setTele] = useState(false);
  const [fillForm, setfillForm] = useState(false);
  const [loading, setloading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullname: "",

    contact: "",
    age: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [userFetchedInfo, setFetchedInfo] = useState({
    fullname: "",
    contact: "",
    age: "",
    address: "",
    email: "",
    name: "",
    profileImage: "",
  });

  const userId = localStorage.getItem("userId");

  const PostUserInfo = async () => {
    setloading(true);

    try {
      const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/add-userinfo`,
        {
          userId,
          ...userInfo,
        }
      );
      toast.success("Info added Successfully!", {
        duration: 2000,
      });
      setloading(false);
 
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
      setloading(false);
    }
  };
  const UpdateInfo = async (updated) => {
    setloading(true);
    console.log("ye", updated);

    try {
      const res = await axios.put(
       `${import.meta.env.VITE_API_BASE_URL}/api/update-userinfo`,
        {
          userId,
          ...updated,
        }
      );
      toast.success("Info added Successfully!", {
        duration: 2000,
      });
      setloading(false);
      // setFetchedInfo()
      setAddress(false)
      setAge(false)
      setTele(false)
      setEmail(false)
      setuserName(false)
      setfullname(false)
    
      console.log("yoooo", res.data);
    } catch (error) {
      toast.error(error.message, {
        duration: 2000,
      });
      setloading(false);
    }
  };

  useEffect(() => {
    //  setLoading(true);
    const getInfo = async () => {
      try {
        const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/user-info/${userId}`
        );

        console.log(res.data.user);

        setFetchedInfo({
          fullname: res.data.user.fullname,
          contact: res.data.user.contact,
          age: res.data.user.age,
          address: res.data.user.address,
          email: res.data.user.userId.email,
          name: res.data.user.userId.name,
          profileImage: res.data.user.userId.profileImage,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getInfo();
  }, []);

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

          {/* Main  Content */}
          <div className="flex flex-col w-full ">
            <div className="h-70 w-full bg-[#040113] flex flex-row justify-between relative">
              <div className="flex md:flex-row flex-col gap-5 items-center m-10 ">
                <img
                  src={userFetchedInfo.profileImage}
                  className="md:h-30  md:w-30 h-15 w-15 rounded-full"
                />
                <div className="flex flex-col">
                  <p className="font-winky md:text-2xl text-[20px] text-white ">
                    {userFetchedInfo.name}
                  </p>
                  <div className="flex flex-row justify-between text-white">
                    {!fullname ? (
                      <p className="md:text-sm text-[10px] text-[#b5aeae]">
                        {userFetchedInfo.fullname}
                      </p>
                    ) : (
                      <div className="flex flex-row items-center gap-1.5">
                        <input
                          type="text"
                          name="fullname"
                          className="focus:outline-none  text-sm"
                          placeholder="Enter your fullname"
                          value={userInfo.fullname}
                          onChange={handleChange}
                        />
                        <button
                          className="cursor-pointer"
                          onClick={() =>
                            UpdateInfo({ fullname: userInfo.fullname })
                          }
                        >
                          <FaCheckCircle color="green" size={20} />
                        </button>
                      </div>
                    )}

                    <button onClick={() => setfullname(!fullname)}>
                      <AiTwotoneEdit className=" ml-3 cursor-pointer" />
                    </button>
                    <Popover open={fillForm} onOpenChange={setfillForm}>
                      <PopoverTrigger asChild>
                        <button
                          onClick={() => setfillForm(true)}
                          className="cursor-pointer"
                        >
                          <FiPlusCircle className="ml-3 md:mt-0.5 mt-2" />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent className="p-4 bg-[#0b0b0bed] rounded text-white ">
                        <input
                          type="text"
                          name="fullname"
                          className="mb-2 border p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#7379e9]"
                          placeholder="Add full name"
                          value={userInfo.fullname}
                          onChange={handleChange}
                        />
                        <input
                          type="tel"
                          name="contact"
                          className="mb-2 border p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#7379e9]"
                          placeholder="Add contact"
                          value={userInfo.contact}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="age"
                          className="mb-2 border p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#7379e9]"
                          placeholder="Add Your age"
                          value={userInfo.age}
                          onChange={handleChange}
                        />
                        <input
                          type="text"
                          name="address"
                          className="mb-2 border p-1 rounded focus:outline-none focus:ring-2 focus:ring-[#7379e9]"
                          placeholder="Add full address"
                          value={userInfo.address}
                          onChange={handleChange}
                        />

                        <button
                          className="bg-[#07ba22] text-white px-3 py-1 rounded hover:bg-[#92e088] mt-1 block"
                          onClick={PostUserInfo}
                          disabled={loading}
                        >
                          {loading ? (
                            <ImSpinner2
                              color="white"
                              className="animate-spin "
                            />
                          ) : (
                            "Save"
                          )}
                        </button>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="relative md:h-70 md:w-100 w-72 h-70 bg-black rounded-tl-[50%]  overflow-hidden shadow-lg">
                <img
                  src={carAdmin}
                  alt="Admin Car"
                  className="h-full w-full object-cover opacity-60"
                />
              </div>
            </div>

            <div className="bg-[#babcd78f] md:h-[390px] h-[480px] w-2/3 absolute md:top-[45%] md:left-[20%] left-[24%] top-[40%] rounded-t-3xl z-20 overflow-y-auto scrollbar-hide">
              <div className="bg-[#babcd78f] w-2/3rounded-t-3xl z-20">
                <h1 className="ml-10 md:text-3xl text-xl sticky top-0 z-30 py-4">
                  Basic Info
                </h1>
                <div className="mt-10 ml-10 w-4/5 flex flex-row justify-between">
                  <p className="md:text-sm text-[10px]">
                    Name : {userFetchedInfo.fullname}
                  </p>

                  {/* <button onClick={()=>setIs(true)}><AiTwotoneEdit /></button> */}
                </div>
                <div className="h-[1px] bg-[#aaa6a6] ml-10 mr-10"></div>{" "}
                <div className="mt-10 ml-10 w-4/5 flex flex-row justify-between">
                  {!Email ? (
                    <p className="md:text-sm text-[10px]">
                      Email : {userFetchedInfo.email}
                    </p>
                  ) : (
                    <div>
                      <input
                        type="email"
                        className="focus:outline-none  text-sm"
                        placeholder="Enter your email"
                        value={userInfo.email}
                        onChange={handleChange}
                      />
                      <button
                        className="cursor-pointer"
                        onClick={() => UpdateInfo({ fullname: userInfo.email })}
                      >
                        <FaCheckCircle color="green" size={20} />
                      </button>
                    </div>
                  )}

                  <button onClick={() => setEmail(!Email)}>
                    <AiTwotoneEdit className="cursor-pointer" />
                  </button>
                </div>
                <div className="h-[1px] bg-[#aaa6a6] ml-10 mr-10"></div>
                <div className="mt-10 ml-10 w-4/5 flex flex-row justify-between">
                  {!userName ? (
                    <p className="md:text-sm text-[10px]">
                      Username : {userFetchedInfo.name}
                    </p>
                  ) : (
                    <div>
                      <input
                        type="name"
                        className="focus:outline-none  text-sm"
                        placeholder="Enter your name"
                        value={userInfo.name}
                        onChange={handleChange}
                      />
                      <button className="cursor-pointer" onClick={() => UpdateInfo({ name: userInfo.name })}>
                        <FaCheckCircle color="green" size={20} />
                      </button>
                    </div>
                  )}

                  <button onClick={() => setuserName(!userName)}>
                    <AiTwotoneEdit className="cursor-pointer" />
                  </button>
                </div>
                <div className="h-[1px] bg-[#aaa6a6] ml-10 mr-10"></div>{" "}
                <div className="mt-10 ml-10 w-4/5 flex flex-row justify-between">
                  {!Tele ? (
                    <p className="md:text-sm text-[10px]">
                      Contact :{userFetchedInfo.contact || ""}
                    </p>
                  ) : (
                    <div>
                      <input
                        type="tel"
                        name="contact"
                        className="focus:outline-none  text-sm"
                        placeholder="Enter your contact"
                         value={userInfo.contact}
                        onChange={handleChange}
                      />
                      <button className="cursor-pointer" onClick={() => UpdateInfo({ contact: userInfo.contact })}>
                        <FaCheckCircle color="green" size={20} />
                      </button>
                    </div>
                  )}

                  <button onClick={() => setTele(!Tele)}>
                    <AiTwotoneEdit className="cursor-pointer" />
                  </button>
                </div>
                <div className="h-[1px] bg-[#aaa6a6] ml-10 mr-10"></div>{" "}
                <div className="mt-10 ml-10 w-4/5 flex flex-row justify-between">
                  {!Age ? (
                    <p className="md:text-sm text-[10px]">
                      Age : {userFetchedInfo.age || " "}
                    </p>
                  ) : (
                    <div>
                      <input
                        type="number"
                        name="age"
                        className="focus:outline-none  text-sm"
                        placeholder="Enter your Age"
                           value={userInfo.age}
                        onChange={handleChange}
                      />
                      <button className="cursor-pointer" onClick={() => UpdateInfo({ age: userInfo.age })}>
                        <FaCheckCircle color="green" size={20} />
                      </button>
                    </div>
                  )}

                  <button onClick={() => setAge(!Age)}>
                    <AiTwotoneEdit className="cursor-pointer" />
                  </button>
                </div>
                <div className="h-[1px] bg-[#aaa6a6] ml-10 mr-10"></div>{" "}
                <div className="mt-10 ml-10 w-4/5 flex flex-row justify-between">
                  {!Address ? (
                    <p className="md:text-sm text-[10px]">
                      Address : {userFetchedInfo.address || ""}
                    </p>
                  ) : (
                    <div>
                      <input
                        type="name"
                        name="address"
                        className="focus:outline-none  text-sm"
                        placeholder="Enter your Address"
                          value={userInfo.address}
                        onChange={handleChange}
                      />
                      <button className="cursor-pointer"  onClick={() => UpdateInfo({ address: userInfo.address })}>
                        <FaCheckCircle color="green" size={20} />
                      </button>
                    </div>
                  )}

                  <button onClick={() => setAddress(!Address)}>
                    <AiTwotoneEdit className="cursor-pointer" />
                  </button>
                </div>
                <div className="h-[1px] bg-[#555353] ml-10 mr-10"></div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
