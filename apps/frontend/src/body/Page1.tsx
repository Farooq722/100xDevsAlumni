export const Page1 = () => {
  return (
    <div className="mt-20 px-4">
      <div className="text-center font-semibold">
        <h1 className="text-2xl sm:text-3xl md:text-4xl bg-gradient-to-bl from-teal-500 to-pink-500 bg-clip-text text-transparent italic">
          The Power of Our Network
        </h1>
      </div>

      <div className="text-center font-medium mt-4">
        <h1 className="text-slate-600 text-sm sm:text-base">
          Join thousands of successful alumni who are shaping the future of
          technology
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center mt-10 gap-6">
        <div className="w-64 border bg-gradient-to-bl from-teal-100 to-pink-100 rounded-xl p-5 flex flex-col items-center justify-center gap-2">
          <h1 className="text-center text-lg">5000+</h1>
          <h1 className="text-center text-sm sm:text-base">Alumni Worldwide</h1>
        </div>
        <div className="w-64 border bg-gradient-to-bl from-teal-100 to-pink-100 rounded-xl p-5 flex flex-col items-center justify-center gap-2">
          <h1 className="text-center text-lg">120+</h1>
          <h1 className="text-center text-sm sm:text-base">
            Country Represented
          </h1>
        </div>
        <div className="w-64 border bg-gradient-to-bl from-teal-100 to-pink-100 rounded-xl p-5 flex flex-col items-center justify-center gap-2">
          <h1 className="text-center text-lg">87%</h1>
          <h1 className="text-center text-sm sm:text-base">
            Career Advancement
          </h1>
        </div>
        <div className="w-64 border bg-gradient-to-bl from-teal-100 to-pink-100 rounded-xl p-5 flex flex-col items-center justify-center gap-2">
          <h1 className="text-center text-lg">250+</h1>
          <h1 className="text-center text-sm sm:text-base">
            Partner Companies
          </h1>
        </div>
      </div>
    </div>
  );
};
