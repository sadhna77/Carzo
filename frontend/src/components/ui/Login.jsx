import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

export const Login = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");


















  // function for login 
  const mutation = useMutation({
    mutationFn: async ({ email, password }) => {
      
      const res = await axios.post("http://192.168.0.102:5001/api/login", {
        email,
        password,
      });
      return res.data; // axios me .data milta hai response me
    },
    onSuccess: (data) => {
      toast.success("Logged in successfully!", {
        duration: 2000,
      });
      setSuccess(true);
      onLoginSuccess();
      onClose();

      console.log("sucesssss")


      const authtoken = data.token;
      const username = data.name;
      const userId = data.userId;

      console.log("username hai", username);
      localStorage.setItem("authtoken", authtoken);
      localStorage.setItem("username", username);
      localStorage.setItem("userId", userId);
      localStorage.setItem("email", email);
      localStorage.setItem("profileImage", data.profileImage);
      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

      setEmail("");
      setPassword("");
    },
    onError: (error) => {
      console.error(
        "❌ Login error",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message, {
        duration: 2000, // 4000 milliseconds = 4 seconds
      });

      setSuccess(false);
    },
  });

  // handling mutation function
  const handleLogin = () => {
  if (!email || !password || !email.includes("@")) {
    toast.error("Please enter a valid email and password", {
      duration: 1000,
    });
    return;
  }

  mutation.mutate({ email, password });
 
};


  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-[#696fdb] text-xl"
        >
          <RxCross2 className=" hover:text-[#5e63c6]" />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-[#5459AC]">
          LogIn
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded focus:outline-[#7379e9]"
        />

        <div className="relative w-full ">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 px-4 py-2 border rounded focus:outline-[#7379e9]"
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash color="#7379e9" />
            ) : (
              <FaEye color="#7379e9" />
            )}
          </span>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#7379e9] text-white py-2 rounded hover:bg-[#5f65d6] transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};
