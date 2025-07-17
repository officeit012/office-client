import { Users, Award, Clock, Cpu, Shield, Globe } from "lucide-react";

const WhyChooseSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-7">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Why Choose Office IT
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            What sets us apart from other IT solution providers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="flex items-start">
            <div className="bg-purple-100 rounded-full p-2 sm:p-3 mr-3 sm:mr-4 flex-shrink-0">
              <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-purple-700" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Comprehensive Solutions
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                From hardware to software, we provide end-to-end IT solutions
                tailored to your business needs.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-purple-100 rounded-full p-2 sm:p-3 mr-3 sm:mr-4 flex-shrink-0">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-700" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Expert Team
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Our team of certified professionals brings years of industry
                experience and technical expertise.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-purple-100 rounded-full p-2 sm:p-3 mr-3 sm:mr-4 flex-shrink-0">
              <Cpu className="h-5 w-5 sm:h-6 sm:w-6 text-purple-700" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Cutting-Edge Technology
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We partner with leading manufacturers to offer the latest and
                most innovative products.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-purple-100 rounded-full p-2 sm:p-3 mr-3 sm:mr-4 flex-shrink-0">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-purple-700" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Quality Assurance
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                All our products undergo rigorous testing to ensure reliability
                and performance.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-purple-100 rounded-full p-2 sm:p-3 mr-3 sm:mr-4 flex-shrink-0">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-purple-700" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Responsive Support
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Our dedicated support team is available to assist you whenever
                you need help.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-purple-100 rounded-full p-2 sm:p-3 mr-3 sm:mr-4 flex-shrink-0">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-purple-700" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                Industry Recognition
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Award-winning solutions and services recognized for excellence
                in the IT industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
