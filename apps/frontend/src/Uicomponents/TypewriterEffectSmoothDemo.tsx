import { TypewriterEffectSmooth } from "@repo/ui/uicomponents/typewriter-effect";
import { motion } from "motion/react";

export default function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Unlock",
    },
    {
      text: "endless",
    },
    {
      text: "opportunities",
    },
    {
      text: "with",
    },
    {
      text: "100xAlumni.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-[25rem] "
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <p className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-lg  ">
        The path to success begins with the power of connection.
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-pink-300 hover:text-black hover:bg-gradient-to-r hover:from-purple-300 hover:to-pink-300 transition-all border dark:border-white border-transparent text-white text-sm">
          Join now
        </button>
        <button className="w-40 h-10 rounded-xl bg-pink-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-300 hover:to-pink-300 transition-all border dark:border-white border-transparent text-black text-sm">
          Signup
        </button>
      </div>
    </motion.div>
  );
}
