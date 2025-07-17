import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-pink-700 text-white">
      <div className="absolute inset-0 opacity-20 bg-[url('/hero.jpeg')] bg-center bg-cover"></div>
      <div className="container mx-auto px-10 py-24 md:py-36 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Your Complete Office IT Solutions Provider
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Discover a wide range of high-quality office equipment and IT
            solutions tailored for modern businesses.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              className="px-6 py-3 bg-white text-purple-800 font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
