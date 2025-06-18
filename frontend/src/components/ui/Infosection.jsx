// 👇 InfoSection.jsx (or inside your Hero component)

import React from "react";
import herocar from '../../assets/herocar.jpg';


const InfoSection = () => {
  return (
    <section className="bg-white py-12 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-10 font-winky">
      {/* Image */}
      <div className="w-full md:w-1/2">
        <img
          src={herocar}
          alt="Luxury Car"
          className="rounded-2xl shadow-lg w-full max-h-[400px] object-cover"

        />
      </div>

      {/* Text Info */}
      <div className="w-full md:w-1/2 space-y-6">
        <h2 className="text-4xl font-bold leading-snug text-[#363cb7]">
          Find Your Perfect Ride
        </h2>
        <p className="text-[#060834] text-lg">
          Discover a wide range of cars to suit every taste and budget. From
          sleek sedans to powerful SUVs, we bring you only the best. Quality,
          trust, and performance—everything you need in one place.
        </p>
        <p className="text-[#060834] text-lg">
          Our handpicked selection ensures you drive away with confidence. Fast
          support, easy financing, and unmatched deals only at{" "}
          <span className="text-blue-600 font-semibold">AutoDrive</span>.
        </p>
        <button className="mt-4 bg-[#363cb7] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#787aa9] transition">
          Browse Cars
        </button>
      </div>
    </section>
  );
};

export default InfoSection;

