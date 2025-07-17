import { Link } from "react-router-dom";
import {
  Laptop,
  Printer,
  Cctv,
  Keyboard,
  Store,
  ChevronRight,
} from "lucide-react";

const ProductCategoriesSection = () => {
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top geometric shapes */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-gray-400/10 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-16 right-20 w-12 h-12 bg-gray-500/8 rotate-45 animate-float-slow"></div>
        <div className="absolute top-32 left-1/4 w-8 h-8 bg-gray-300/12 rounded-full animate-float-medium"></div>

        {/* Middle layer shapes */}
        <div className="absolute top-1/2 left-8 w-20 h-20 bg-gray-400/8 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/2 right-12 w-14 h-14 bg-gray-500/10 rotate-12 animate-pulse-medium"></div>
        <div className="absolute top-1/2 left-1/3 w-10 h-10 bg-gray-300/15 rounded-full animate-float-fast"></div>

        {/* Bottom geometric shapes */}
        <div className="absolute bottom-20 left-16 w-18 h-18 bg-gray-400/12 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-24 right-8 w-16 h-16 bg-gray-500/8 rotate-45 animate-pulse-slow"></div>
        <div className="absolute bottom-32 left-2/3 w-12 h-12 bg-gray-300/10 rounded-full animate-float-fast"></div>

        {/* Hexagonal shapes for tech feel */}
        <div
          className="absolute top-24 right-1/4 w-10 h-10 bg-gray-400/8 rotate-45 animate-float-slow"
          style={{
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        ></div>
        <div
          className="absolute bottom-16 left-1/2 w-14 h-14 bg-gray-500/6 rotate-12 animate-pulse-medium"
          style={{
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        ></div>

        {/* Connecting dots pattern */}
        <div className="absolute top-40 left-1/2 w-4 h-4 bg-gray-400/15 rounded-full animate-pulse-fast"></div>
        <div
          className="absolute top-48 left-1/2 w-4 h-4 bg-gray-400/15 rounded-full animate-pulse-fast"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-56 left-1/2 w-4 h-4 bg-gray-400/15 rounded-full animate-pulse-fast"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-7 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our Product Categories</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of products designed to meet all your office
            and IT needs
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          <Link
            to="/products?category=Computers"
            className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-6 md:p-8 text-center">
              <div className="bg-purple-100 rounded-full p-3 md:p-4 inline-flex mb-4 md:mb-6">
                <Laptop className="md:w-9 md:h-9 text-purple-700" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                Computers
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Laptops and desktops
              </p>
            </div>
          </Link>
          <Link
            to="/products?category=CCTV Cameras"
            className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-6 md:p-8 text-center">
              <div className="bg-purple-100 rounded-full p-3 md:p-4 inline-flex mb-4 md:mb-6">
                <Cctv className="md:w-9 md:h-9 text-purple-700" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                CCTV Cameras
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                CCTV Cameras, DVRs, and related accessories
              </p>
            </div>
          </Link>
          <Link
            to="/products?category=Printers"
            className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-6 md:p-8 text-center">
              <div className="bg-purple-100 rounded-full p-3 md:p-4 inline-flex mb-4 md:mb-6">
                <Printer className="md:w-9 md:h-9 text-purple-700" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                Printers
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Multifunction photocopy machines and printers
              </p>
            </div>
          </Link>
          <Link
            to="/products?category=Accessories"
            className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-6 md:p-8 text-center">
              <div className="bg-purple-100 rounded-full p-3 md:p-4 inline-flex mb-4 md:mb-6">
                <Keyboard className="md:w-9 md:h-9 text-purple-700" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                Accessories
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Keyboards, mice, toners, speakers, external drives, etc.
              </p>
            </div>
          </Link>
          <Link
            to="/products?category=Retail Hardware Solutions"
            className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="p-6 md:p-8 text-center">
              <div className="bg-purple-100 rounded-full p-3 md:p-4 inline-flex mb-4 md:mb-6">
                <Store className="md:w-9 md:h-9 text-purple-700" />
              </div>
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                Retail Hardware Solutions
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                POS and cash handling equipment, etc.
              </p>
            </div>
          </Link>
        </div>
        <div className="text-center mt-8 md:mt-10">
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-700 hover:bg-purple-800 transition-colors"
          >
            View All Products
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(90deg);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(270deg);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-medium {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-fast {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.02);
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-medium {
          animation: pulse-medium 3s ease-in-out infinite;
        }

        .animate-pulse-fast {
          animation: pulse-fast 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ProductCategoriesSection;
