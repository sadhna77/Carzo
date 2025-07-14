import React, { useState } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const SignUpModal = ({ onClose, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const mutation = useMutation({
    mutationFn: async ({ name, email, password }) => {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/signup`, {
        name,
        email,
        password,
      });
      return res.data; // axios me .data milta hai response me
    },
    onSuccess: (data) => {
      
      setSuccess(true);
      onLoginSuccess();
       toast.success("Created account successfully!", {
              duration: 2000,
            });
      const authtoken = data.token;
      const username = data.name;
      localStorage.setItem("authtoken", authtoken);
      localStorage.setItem("username", username);
      localStorage.setItem("email", data.email);
      setTimeout(() => {
        navigate("/dashboard");
        onClose();
      }, 1000);
      
    onClose();
    },
    onError: (error) => {
      toast.warning(" Some Error in Signing Up!", {
             duration: 2000,
           });
      console.error(
        "❌ Signup error",
        error.response?.data?.message || error.message
      );
      setSuccess(false);
    },
  });

  const fieldErrors = mutation.error?.response?.data?.errors || {};

  // function to handle mutation

  const handleSignup = () => {
      const { name, email, password } = formData;
    

  if (!name || !email || !password || !email.includes("@")) {
    setErrors({ form: "Please fill all fields with valid values." });
    return;
  }
 
    mutation.mutate(formData);
  
  };

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 text-xl"
        >
          <RxCross2 className=" hover:text-[#5e63c6]" />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-[#5459AC]">
          Sign Up
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-4 p-2 border rounded focus:outline-[#7379e9]"
        />
        {fieldErrors.name && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mt-4 p-2 border rounded focus:outline-[#7379e9]"
        />
        {/* backend error  */}
        {fieldErrors.email && (
          <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
        )}

        <div className="relative w-full ">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-4 p-2 border rounded focus:outline-[#7379e9]"
          />
          <span
            className="absolute right-3 top-7 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash color="#7379e9" />
            ) : (
              <FaEye color="#7379e9" />
            )}
          </span>
        </div>
        {/* this is backend side error for sahi se password nhi dala  */}
        {fieldErrors.password && (
          <p className="text-red-500 text-sm ">{fieldErrors.password}</p>
        )}

        <button
          onClick={handleSignup}
          className="w-full bg-[#7379e9] text-white py-2 rounded hover:bg-[#5f65d6] transition mt-2.5"
        >
          Create Account
        </button>

        {mutation.isError && (
          <p className="text-red-500 text-sm mt-2">{mutation.error.message}</p>
        )}
        {success && (
          <p className="text-green-600 mt-2 ">Account created successfully!</p>
        )}
      </div>
    </div>
  );
};
