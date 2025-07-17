import React from "react";

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="text-center">
        {/* Logo with subtle animation */}
        <div className="mb-8 animate-pulse">
          <img
            src="/logo.jpeg"
            alt="Office IT Solutions"
            className="h-16 md:h-20 mx-auto opacity-90"
          />
        </div>

        {/* Main spinner container */}
        <div className="relative mb-6">
          {/* Outer spinning ring */}
          <div className="relative mx-auto w-16 h-16 md:w-20 md:h-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-700 via-pink-500 to-purple-700 animate-spin">
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-purple-50 via-white to-pink-50"></div>
            </div>
          </div>

          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800">
            {message}
          </h3>
          <p className="text-sm md:text-base text-gray-600">
            Please wait while we prepare your experience
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
