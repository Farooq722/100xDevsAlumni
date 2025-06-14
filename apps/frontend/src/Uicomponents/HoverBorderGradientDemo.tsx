import { HoverBorderGradient } from "@repo/ui/uicomponents/hover-border-gradient";
import { motion } from "motion/react";

interface spanText {
  text: string;
}

export function HoverBorderGradientDemo({ text }: spanText) {
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
        containerClassName="rounded-2xl"
        as="button"
        className="dark:bg-black bg-gradient-to-bl from-teal-200 to-pink-200 text-black dark:text-black flex items-center space-x-2 px-6"
      >
        <span>{text}</span>
      </HoverBorderGradient>
    </motion.div>
  );
}
