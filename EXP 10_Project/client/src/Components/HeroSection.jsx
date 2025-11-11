import React from "react";
import { assets } from "../assets/assets";
import { CalendarIcon, ClockIcon, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate(); // 👈 fixed useNavigate usage

  return (
    <div
      className="
        relative
        flex flex-col justify-center gap-4
        px-6 md:px-16 lg:px-36
        bg-[url('/backgroundImage.png')] bg-cover bg-center
        h-[100vh] w-full text-white
        -z-10 overflow-hidden
      "
      style={{ marginTop: "-96px" }} // pushes image up behind navbar precisely
    >
      <div className="relative z-10 max-w-2xl">
        {/* Marvel Logo */}
        <img
          src={assets.marvelLogo}
          alt="Marvel Logo"
          className="max-h-11 lg:h-11 mb-3"
        />

        {/* Movie Title */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Guardians <br /> of the Galaxy
        </h1>

        {/* Movie Info */}
        <div className="flex items-center gap-4 text-gray-300 mt-3">
          <span>Action | Adventure | Sci-Fi</span>

          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" /> 2018
          </div>

          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" /> 2h 8m
          </div>
        </div>

        {/* Movie Description */}
        <p className="max-w-md text-gray-300 mt-4">
          In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.
        </p>

        {/* Explore Movies Button */}
        <button
          onClick={() => navigate("/")}
          className="
            flex items-center gap-2
            px-8 py-3 mt-6
            bg-red-500 hover:bg-red-600
            text-white font-semibold
            text-sm md:text-base
            rounded-full
            shadow-lg
            transition-all duration-300
            transform hover:scale-105
            cursor-pointer
          "
        >
          Explore Movies
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
