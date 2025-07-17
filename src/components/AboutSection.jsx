import { Link } from "react-router-dom";
import { Eye, Lightbulb, TrendingUp } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-7">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">About Office IT</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We are committed to providing innovative technology solutions that
            transform the way businesses operate
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div className="text-center">
            <div className="bg-gray-100 rounded-full p-6 inline-flex mb-6 mx-auto">
              <Eye className="h-8 w-8 md:h-10 md:w-10 text-indigo-700" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 px-2 md:px-4 text-sm md:text-base">
              To revolutionize workplace technology through innovative solutions
              that empower businesses to thrive in the digital age.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 rounded-full p-6 inline-flex mb-6 mx-auto">
              <Lightbulb className="h-8 w-8 md:h-10 md:w-10 text-indigo-700" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 px-2 md:px-4 text-sm md:text-base">
              Delivering cutting-edge IT solutions that enhance productivity,
              security, and efficiency for modern workplaces.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-gray-100 rounded-full p-6 inline-flex mb-6 mx-auto">
              <TrendingUp className="h-8 w-8 md:h-10 md:w-10 text-indigo-700" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Our Objectives
            </h3>
            <p className="text-gray-600 px-2 md:px-4 text-sm md:text-base">
              To provide sustainable, scalable, and secure IT infrastructure
              solutions that drive business growth and success.
            </p>
          </div>
        </div>
        <div className="text-center mt-10 md:mt-12">
          <Link
            to="/about"
            className="px-6 py-3 bg-gradient-to-r from-purple-700 to-pink-500 text-white font-medium rounded-md hover:opacity-90 transition-opacity"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
