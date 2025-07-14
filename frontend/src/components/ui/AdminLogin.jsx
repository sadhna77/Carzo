import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ImSpinner } from "react-icons/im";

export const AdminLogin = ({ onClose,onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");

  const mutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/admin-login`,
        {
          email,
          password,
        }
      );
      return res.data; // axios me .data milta hai response me
    },
    onSuccess: (data) => {
      setSuccess(true);
       onLoginSuccess();
      toast.success("Logged in successfully!", {
        duration: 2000,
      });

      localStorage.setItem("admin", JSON.stringify(true));
      setTimeout(() => {
        navigate("/admin");
      }, 800);
    },
    onError: (error) => {
      console.error(
        "❌ Login error",
        error.response?.data?.message || error.message
      );

      const message = error.response?.data?.message || error.message;
      toast.error(message, {
        duration: 2000,
      });

      setSuccess(false);
    },
  });

  // handling mutation function
  const handleLogin = () => {
    mutation.mutate({ email, password });
    onClose();
  };



   















  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center  font-winky text-black">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl  relative border-1">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-[#696fdb] text-xl"
        >
          <RxCross2 className=" hover:text-[#5e63c6]" />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center text-[#06822b]">
          LogIn as Admin
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded focus:outline-[#39aa46] text-black"
        />

        <div className="relative w-full ">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 px-4 py-2 border rounded focus:outline-[#42a939]"
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash color="#42a939" />
            ) : (
              <FaEye color="#42a939" />
            )}
          </span>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#18800a] text-white py-2 rounded hover:bg-[#9ad67c] transition"
        >
          {mutation.isPending ? (
            <ImSpinner className="animate-spin  ml-28 md:ml-50" />
          ) : (
            "Login"
          )}
        </button>
        {mutation.isError && (
          <p className="text-red-500 text-sm mt-2">
            {mutation.error.response?.data?.message}
          </p>
        )}
        {success && <p className="text-green-600 mt-2 ">Login successful!</p>}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-[#0a804d] text-white py-2 rounded hover:bg-[#b4d0b0] transition mt-2"
        >
          Back to User
        </button>

        <p className="ml-10  bg-gradient-to-r from-green-900 to-white bg-clip-text text-transparent mt-1 ">
          Dont't have an account?{" "}
          <Link className="text-[#42a939]" to="/admin-signup">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};
