import { HoverBorderGradient } from "@repo/ui/uicomponents/hover-border-gradient";
import { motion } from "motion/react";

interface spanText {
  text: string;
}

export function HoverBorderGradientDemo({ text }: spanText) {
  return (
    <motion.div
      className="m-12 flex justify-center text-center"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1.02 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true }}
    >
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-gradient-to-bl from-teal-100 to-pink-100 text-black dark:text-white flex items-center space-x-2 px-6"
      >
        <span>{text}</span>
      </HoverBorderGradient>
    </motion.div>
  );
}
