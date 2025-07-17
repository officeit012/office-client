import { Target, Award, Shield } from "lucide-react";

const CorePrinciplesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-7">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Our Core Principles
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            The guiding principles that drive everything we do at Office IT
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div className="bg-purple-100 rounded-full p-3 sm:p-4 inline-flex mb-4 sm:mb-6">
              <Target className="h-6 w-6 sm:h-8 sm:w-8 text-purple-700" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              To be the leading provider of innovative and reliable office
              automation solutions that empower businesses to achieve
              operational excellence and digital transformation.
            </p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div className="bg-purple-100 rounded-full p-3 sm:p-4 inline-flex mb-4 sm:mb-6">
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-purple-700" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              To deliver high-quality, cost-effective office automation products
              and services that boost workplace productivity, streamline
              operations, and offer exceptional customer support — all while
              embracing sustainability and technological progress.
            </p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <div className="bg-purple-100 rounded-full p-3 sm:p-4 inline-flex mb-4 sm:mb-6">
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-purple-700" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
              Our Values
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Customer focus, innovation, integrity, reliability,
              sustainability, teamwork, and a commitment to excellence form the
              foundation of everything we do at Office IT.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorePrinciplesSection;
