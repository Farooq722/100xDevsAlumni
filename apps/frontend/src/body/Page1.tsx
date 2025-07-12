import { motion } from "motion/react";

export const Page1 = () => {
  const stats = [
    {
      number: "15,000+",
      label: "Elite Alumni Worldwide",
      gradient: "from-blue-600 to-purple-600",
    },
    {
      number: "150+",
      label: "Countries Represented",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      number: "100%",
      label: "Success Rate",
      gradient: "from-pink-600 to-red-600",
    },
    {
      number: "300%",
      label: "Average Salary Jump",
      gradient: "from-red-600 to-orange-600",
    },
  ];

  return (
    <motion.div
      className="mt-12 sm:mt-16 md:mt-20 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="text-center font-semibold max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-br from-blue-600 to-pink-600 bg-clip-text text-transparent italic leading-tight">
          The Power Of Our Elite Network
        </h1>
      </div>

      <div className="text-center font-medium mt-4 sm:mt-6 max-w-3xl mx-auto">
        <h1 className="text-slate-700 text-sm sm:text-base md:text-lg lg:text-xl px-4">
          Join thousands of successful alumni who are{" "}
          <span className="bg-gradient-to-br from-teal-600 to-violet-600 bg-clip-text text-transparent italic">
            transforming the future
          </span>{" "}
          of technology
        </h1>
      </div>

      <motion.div
        className="mt-12 sm:mt-16 md:mt-20 max-w-6xl mx-auto"
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Grid Layout for Responsive Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group relative w-full max-w-xs"
              whileHover="hover"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Card with Fixed Aspect Ratio */}
              <div className="relative bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-xl group-hover:shadow-2xl transition-all duration-500 backdrop-blur-sm aspect-square flex flex-col justify-center items-center">
                {/* Gradient Border Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  style={{ padding: "2px" }}
                >
                  <div className="bg-white rounded-3xl w-full h-full" />
                </div>

                <div className="relative z-10 text-center">
                  <motion.h3
                    className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-2 sm:mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {stat.number}
                  </motion.h3>

                  <motion.p
                    className="text-gray-700 font-semibold text-sm sm:text-base lg:text-lg leading-tight"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {stat.label}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
