import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Search, Mail, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15);

  // Auto-redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const popularPages = [
    {
      name: "Products",
      path: "/products",
      icon: ShoppingBag,
      description: "Browse our IT solutions",
    },
    {
      name: "About Us",
      path: "/about",
      icon: Search,
      description: "Learn about Office IT",
    },
    {
      name: "Contact",
      path: "/contact",
      icon: Mail,
      description: "Get in touch with us",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-700 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-20 h-20 bg-white rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-white rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Visual */}
          <div className="mb-8">
            <div className="relative inline-block">
              <h1 className="text-9xl md:text-[12rem] font-bold text-white/20 select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-8 border border-white/20">
                  <Search size={64} className="text-white animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Oops! Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-gray-100 mb-4 max-w-2xl mx-auto">
              It looks like the page you're looking for has gone on a coffee
              break. Don't worry, our IT solutions are still working perfectly!
            </p>
            <p className="text-base text-gray-200 mb-8">
              Redirecting to homepage in{" "}
              <span className="font-bold text-white">{countdown}</span>{" "}
              seconds...
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              to="/"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-900 font-medium rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <Home
                className="mr-2 group-hover:scale-110 transition-transform"
                size={20}
              />
              Go Home
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors group"
            >
              <ArrowLeft
                className="mr-2 group-hover:-translate-x-1 transition-transform"
                size={20}
              />
              Go Back
            </button>
          </div>

          {/* Popular Pages */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="md:col-span-3 mb-6">
              <h3 className="text-2xl font-semibold mb-2">
                Or explore these popular pages:
              </h3>
              <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
            </div>

            {popularPages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                    <page.icon size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{page.name}</h4>
                  <p className="text-sm text-gray-200">{page.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Help Section */}
          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">
              Still can't find what you're looking for?
            </h3>
            <p className="text-gray-200 mb-6">
              Our support team is here to help you navigate our IT solutions and
              find exactly what you need.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-white text-purple-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Mail className="mr-2" size={18} />
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  );
};

export default NotFoundPage;
