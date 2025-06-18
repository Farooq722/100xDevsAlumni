import { useNavigate } from "react-router-dom";
import { Navbar } from "../body/Navbar/Navbar";
import { HoverBorderGradientDemo } from "../Uicomponents/HoverBorderGradientDemo";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const features = [
  "Access to alumni directory",
  "Basic profile creation",
  "Join up to 3 groups",
  "Event notifications",
  "Mobile app access",
  "Community forums",
];

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-bl from-teal-50 to-pink-50 min-h-screen">
      <Navbar />
      <div className="pt-2 px-2">
        <HoverBorderGradientDemo icon={"🔥"} text={` Trusted By 500+ Alumni`} />
      </div>

      <motion.div
        className="mb-10"
        initial={{ opacity: 0.2, y: 20 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="text-center font-semibold text-3xl sm:text-4xl md:text-5xl text-gray-800 px-4">
          Choose Your <span className="text-pink-400 italic">Alumni</span>{" "}
          Journey{" "}
        </h1>
      </motion.div>

      <motion.div
        className="flex flex-col lg:flex-row justify-center items-center gap-6 px-4 sm:px-8 md:px-12 lg:px-16 "
        initial={{ opacity: 0.2, y: 40 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* Basic Plan */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md border-2 bg-slate-100 rounded-xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <h1 className="text-start font-bold text-xl text-gray-800 dark:text-black">
            Explorer Basic
          </h1>
          <h2 className="text-start text-md text-gray-700 dark:text-gray-900">
            Complement For Us If You Can{" "}
            <span className="text-red-300">
              {" "}
              <br /> Payments not yet added{" "}
            </span>
          </h2>
          <div className="space-y-2 mb-6">
            <p className="mt-6 text-gray-900">
              <span className="text-3xl font-bold">$1</span>
            </p>
            {features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start">
                <Check />
                <span className="text-gray-700 ml-3 text-sm leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
          <div>
            <button className="mt-2 w-full py-2 rounded-lg font-sans bg-black text-white shadow-md hover:shadow-lg inline-flex justify-center items-center gap-1">
              <p className="text-lg">Start Free Trail</p>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Free Plan */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md border-2 bg-slate-100 rounded-xl p-6 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <h1 className="text-start font-bold text-xl text-gray-800 dark:text-black">
            Free Plan
          </h1>
          <h2 className="text-start text-md text-gray-700 dark:text-gray-900">
            Free For Everyone
          </h2>
          <div className="space-y-2 mb-6">
            <p className="mt-6 text-gray-900 dark:text-black">
              <span className="text-3xl font-semibold">$0</span>
            </p>
            {features.map((feature: string, idx: number) => (
              <div key={idx} className="flex items-start">
                <Check />
                <span className="text-gray-700 ml-3 text-sm leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
          <button
            className="mt-2 w-full py-2 rounded-lg font-sans bg-black text-white shadow-md hover:shadow-lg inline-flex justify-center items-center gap-1"
            onClick={() => {
              navigate("/login");
            }}
          >
            <p className="text-lg">Get Started Free</p>
            <ArrowRight size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
