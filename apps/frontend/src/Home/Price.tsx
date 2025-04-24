import { Navbar } from "../body/Navbar/Navbar";
import { HoverBorderGradientDemo } from "../Uicomponents/HoverBorderGradientDemo";

export const Pricing = () => {
  return (
    <div className="bg-gradient-to-bl from-teal-100 to-pink-100 min-h-screen">
      <Navbar />
      <HoverBorderGradientDemo text={"Our Plans 🔥"} />

      <div className="mb-4">
        <h1 className="text-center font-semibold text-2xl text-gray-800 dark:text-white">
          Choose the plan
        </h1>
      </div>

      <div className="mx-auto my-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md border-2 border-teal-300 bg-gradient-to-bl from-teal-300 to-pink-300 rounded-xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div>
          <h1 className="text-start font-bold text-xl text-gray-800 dark:text-white">
            Basic
          </h1>
          <h1 className="text-start text-md text-gray-700 dark:text-gray-300">
            Best for personal use.
          </h1>
          <p className="mt-6 text-gray-900 dark:text-white">
            <span className="text-3xl font-semibold">$1</span> / Month
          </p>
        </div>

        <button className="mt-10 w-full py-2 bg-gradient-to-bl from-pink-200 to-teal-200 hover:from-teal-300 hover:to-pink-300 transition-all duration-300 rounded-lg font-medium text-gray-800 shadow-md hover:shadow-lg">
          Donate
        </button>
      </div>
    </div>
  );
};
