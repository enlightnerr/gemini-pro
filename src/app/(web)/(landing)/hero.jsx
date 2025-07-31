"use client";

import LoginModal from "@/components/forms/Login";
import SignupModal from "@/components/forms/SignUp";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function HeroSection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-gray-900 text-white px-6 py-12">
      <div className="max-w-3xl text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Your AI Companion, <br className="hidden md:inline" />
          Anytime. Anywhere.
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-zinc-300 mb-10">
          Chat with your AI assistant designed to help, create, and inspire.
          Built with the power of modern AI.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full flex items-center gap-2 transition duration-300 shadow-md hover:shadow-lg">
            <SignupModal />
            <FaArrowRight className="text-sm" />
          </div>
          <div className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md hover:shadow-lg border border-zinc-600">
            <LoginModal />
          </div>
        </div>
      </div>
    </div>
  );
}
