import { HoverBorderGradient } from "@repo/ui/uicomponents/hover-border-gradient";
import { motion } from "motion/react";

interface spanText {
  text: string;
  icon: React.ReactNode;
}

export function HoverBorderGradientDemo({ text, icon }: spanText) {
  return (
    <motion.div
      className="m-12 flex justify-center text-center"
      initial={{ opacity: 0.2, y: 30 }}
      transition={{ duration: 1.02 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true }}
    >
      <HoverBorderGradient
        containerClassName="rounded-2xl "
        as="button"
        className="bg-slate-300 text-black dark:text-black flex justify-center items-center space-x-2 px-6"
      >
        <div className="flex justify-center items-center gap-2 font-medium ">
          <span>{icon}</span>
          <span>{text}</span>
        </div>
      </HoverBorderGradient>
    </motion.div>
  );
}
