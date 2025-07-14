import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "sonner";
import axios from "axios";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
useNavigate



const Contact = () => {



  const [Name,setName] =useState("")
  const [email,setEmail] =useState("")
  const [message,setMessage] =useState("")
  const navigate = useNavigate()

 
  const SendMessage = async (e) => {
  e.preventDefault(); // Prevent form reload
   try {
     const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/contact`,
      {
       Name,email,message
      
      
    })
    console.log(res.data)

      toast.success("Information added successfully!", {
            duration: 2000,
          });

          setEmail("")
          setMessage('')
          setName("")
        

    
   } catch (error) {
   
    toast.error("Server Error" ,{
            duration: 2000,
          });
    
   }

};









  return (
<>
<Header/>
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#5459AC] mb-12 font-winky">
          Get in Touch
        </h1>

        {/* Info and Form Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg p-8 rounded-xl">
          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-6 text-[#5459AC]">
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-xl" />
              <span className="text-lg">+91 9876543210</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-xl" />
              <span className="text-lg">support@carZo.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-xl" />
              <span className="text-lg">Gurgaon, Haryana, India</span>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5459AC]"
              required
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5459AC]"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5459AC]"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              onClick={SendMessage}
              className="w-full bg-[#5459AC] text-white py-3 rounded hover:bg-[#434894] transition"
            >
              Send Message
            </button>
            <button
              onClick={()=>navigate('/')}
              className="w-full bg-[#3e7f10] text-white py-3 rounded active:bg-[#434894] transition"
            >
              Back Home
            </button>
          </form>
        </div>
      </div>
    </div>
</>
  );
};

export default Contact;
