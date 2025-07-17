const LeadershipTeamSection = () => {
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Left side floating shapes */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
        {/* Circle 1 */}
        <div className="absolute left-[-50px] top-20 w-20 h-20 bg-gray-400/20 rounded-full animate-float-slow"></div>
        {/* Square 1 */}
        <div className="absolute left-10 top-40 w-16 h-16 bg-gray-500/15 rotate-45 animate-float-medium"></div>
        {/* Circle 2 */}
        <div className="absolute left-[-30px] top-72 w-12 h-12 bg-gray-300/25 rounded-full animate-float-fast"></div>
        {/* Triangle 1 */}
        <div className="absolute left-20 top-96 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-gray-400/20 animate-float-slow"></div>
        {/* Circle 3 */}
        <div className="absolute left-5 top-[500px] w-24 h-24 bg-gray-600/10 rounded-full animate-float-medium"></div>

        {/* Additional center-left shapes */}
        <div className="absolute left-32 top-24 w-10 h-10 bg-gray-400/15 rounded-full animate-float-fast"></div>
        <div className="absolute left-40 top-64 w-8 h-8 bg-gray-500/20 rotate-45 animate-float-medium"></div>
        <div className="absolute left-28 top-[380px] w-14 h-14 bg-gray-300/18 rounded-full animate-float-slow"></div>
        <div className="absolute left-48 top-[480px] w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-gray-400/18 animate-float-fast"></div>
        <div className="absolute left-36 top-[560px] w-12 h-12 bg-gray-600/12 rotate-12 animate-float-medium"></div>
      </div>

      {/* Right side floating shapes */}
      <div className="absolute right-0 top-0 w-full h-full pointer-events-none">
        {/* Circle 4 */}
        <div className="absolute right-[-40px] top-32 w-18 h-18 bg-gray-400/20 rounded-full animate-float-medium"></div>
        {/* Square 2 */}
        <div className="absolute right-8 top-16 w-14 h-14 bg-gray-500/15 rotate-12 animate-float-fast"></div>
        {/* Circle 5 */}
        <div className="absolute right-[-20px] top-80 w-16 h-16 bg-gray-300/25 rounded-full animate-float-slow"></div>
        {/* Triangle 2 */}
        <div className="absolute right-15 top-[440px] w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-gray-400/20 animate-float-fast"></div>
        {/* Circle 6 */}
        <div className="absolute right-12 top-[520px] w-20 h-20 bg-gray-600/10 rounded-full animate-float-medium"></div>
        {/* Square 3 */}
        <div className="absolute right-[-25px] top-[600px] w-22 h-22 bg-gray-500/15 rotate-45 animate-float-slow"></div>

        {/* Additional center-right shapes */}
        <div className="absolute right-32 top-28 w-10 h-10 bg-gray-400/15 rounded-full animate-float-medium"></div>
        <div className="absolute right-40 top-68 w-8 h-8 bg-gray-500/20 rotate-45 animate-float-fast"></div>
        <div className="absolute right-28 top-[360px] w-14 h-14 bg-gray-300/18 rounded-full animate-float-slow"></div>
        <div className="absolute right-48 top-[500px] w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-gray-400/18 animate-float-medium"></div>
        <div className="absolute right-36 top-[580px] w-12 h-12 bg-gray-600/12 rotate-12 animate-float-fast"></div>
      </div>

      <div className="container mx-auto px-7 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Our Leadership Team
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Meet the talented individuals who drive our vision and success
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-lg overflow-hidden shadow-md w-[360px]">
            <img
              src="chathuranga.jpeg"
              alt="Chathuranga Bandara, Managing Director"
              className="w-full h-48 sm:h-[360px] object-cover"
            />
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-1">
                Chathuranga Bandara
              </h3>
              <p className="text-purple-700 mb-2 sm:mb-3 text-sm sm:text-base">
                Managing Director
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure
                eveniet aspernatur eligendi non sapiente unde fugiat sed ipsum
                laboriosam necessitatibus.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(90deg);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(270deg);
          }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default LeadershipTeamSection;
