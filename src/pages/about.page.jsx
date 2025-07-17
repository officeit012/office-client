import { Link } from "react-router-dom";
import CorePrinciplesSection from "@/components/CorePrinciplesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import LeadershipTeamSection from "@/components/LeadershipTeamSection";

const AboutPage = () => {
  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-purple-900 to-blue-900 text-white py-16 sm:py-20">
        <div className="absolute inset-0 opacity-10 bg-[url('/about-header.jpeg')] bg-center bg-cover"></div>
        <div className="container mx-auto px-7 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              About Office IT
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-100">
              We're dedicated to transforming businesses through innovative
              technology solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">
            <div className="md:w-1/2">
              <img
                src="/about-our-story.jpeg"
                alt="Office IT Team"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                Founded in 2010, Office IT began with a simple mission: to
                provide businesses with reliable and innovative technology
                solutions. What started as a small team of passionate tech
                enthusiasts has grown into a leading provider of comprehensive
                IT solutions for businesses of all sizes.
              </p>
              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                Over the years, we've expanded our product offerings and
                services to meet the evolving needs of modern businesses. Our
                commitment to quality, innovation, and exceptional customer
                service has remained constant throughout our journey.
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                Today, Office IT serves thousands of clients across the country,
                helping them optimize their operations, enhance productivity,
                and stay ahead in an increasingly digital world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <CorePrinciplesSection />

      {/* Why Choose Us Section */}
      <WhyChooseSection />

      {/* Leadership Team Section */}
      <LeadershipTeamSection />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-7 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Discover how Office IT can help transform your business with our
            cutting-edge technology solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            <Link
              to="/products"
              className="w-full sm:w-auto px-6 py-3 bg-white text-purple-900 font-medium rounded-md hover:bg-gray-100 transition-colors text-center"
            >
              Explore Our Products
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors text-center"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
