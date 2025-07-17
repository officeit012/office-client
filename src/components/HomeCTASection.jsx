import { Link } from "react-router-dom";

const HomeCTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-7 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Ready to Upgrade Your Office?
        </h2>
        <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto">
          Our team of experts is ready to help you find the perfect IT solutions
          for your business needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
          <Link
            to="/products"
            className="w-full sm:w-auto px-6 py-3 bg-white text-purple-900 font-medium rounded-md hover:bg-gray-100 transition-colors text-center"
          >
            Browse Products
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors text-center"
          >
            Contact Sales Team
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeCTASection;
