import React from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export const AdminSign = ({ onClose , onLoginSuccess}) => {
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
      const res = await axios.post(
       `${import.meta.env.VITE_API_BASE_URL}/admin/admin-signup`,
        {
          name,
          email,
          password,
        }
      );
      return res.data; // axios me .data milta hai response me
    },
    onSuccess: (data) => {
      setSuccess(true);
      onLoginSuccess();
      localStorage.removeItem("admin");
      localStorage.setItem("admin", JSON.stringify(true));

      toast.success("SignUp Successful!", {
        duration: 2000,
      });

      setTimeout(() => {
        navigate("/admin");
        onClose();
      }, 1000);
    },
    onError: (error) => {
      console.error(
        "❌ Signup error",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message, {
        duration: 2000,
      });
      setSuccess(false);
    },
  });

  const fieldErrors = mutation.error?.response?.data?.errors || {};

  // function to handle mutation

  const handleSignup = () => {
    mutation.mutate(formData);
  };
  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50 text-black">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg relative">
        <button
          className="absolute top-2 right-3 text-gray-500 text-xl"
          onClick={onClose}
        >
          <RxCross2 className=" hover:text-[#5e63c6]" />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-[#5459AC]">
          SignUp as Admin
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 px-4 py-2 border rounded focus:outline-[#7379e9]"
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
          className="w-full mb-3 px-4 py-2 border rounded focus:outline-[#7379e9]"
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
            className="w-full mb-3 px-4 py-2 border rounded focus:outline-[#7379e9]"
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash color="#18800a" />
            ) : (
              <FaEye color="#18800a" />
            )}
          </span>
        </div>
        {/* this is backend side error for sahi se password nhi dala  */}
        {fieldErrors.password && (
          <p className="text-red-500 text-sm ">{fieldErrors.password}</p>
        )}

        <button
          onClick={handleSignup}
          className="w-full bg-[#18800a] text-white py-2 rounded hover:bg-[#b4d0b0] transition"
        >
          Create Account
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-[#0a804d] text-white py-2 rounded hover:bg-[#b4d0b0] transition mt-2"
        >
          Back to User
        </button>

        {mutation.isError && (
          <p className="text-red-500 text-sm mt-2">
            {mutation.error.response?.data?.message}
          </p>
        )}
        {success && (
          <p className="text-green-600 mt-2 ">Account created successfully!</p>
        )}
      </div>
    </div>
  );
};
