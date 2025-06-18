import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#02041f] text-white py-10 px-6 md:px-20 font-winky">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 ">

        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#363cb7] font-merienda">CarZo</h2>
          <p className="text-gray-400 text-sm">
            Find your dream car with us. Trusted by thousands, known for quality and service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-[#363cb7]">Home</a></li>
            <li><a href="#" className="hover:text-[#363cb7]">Browse Cars</a></li>
            <li><a href="#" className="hover:text-[#363cb7]">Sell Your Car</a></li>
            <li><a href="#" className="hover:text-[#363cb7]">About Us</a></li>
            <li><a href="#" className="hover:text-[#363cb7]">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> support@carzo.com
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-blue-500 hover:text-blue-400"><FaFacebookF /></a>
            <a href="#" className="text-pink-500 hover:text-pink-400"><FaInstagram /></a>
            <a href="#" className="text-sky-400 hover:text-sky-300"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} AutoDrive. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
