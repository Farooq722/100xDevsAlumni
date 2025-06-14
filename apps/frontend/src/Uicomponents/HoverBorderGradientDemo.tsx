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
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-neutral-900 bg-neutral-100 text-neutral-900 dark:text-white flex items-center space-x-2 px-6 py-2 font-medium"
      >
        <span className="text-base sm:text-lg md:text-xl">
          {text}
        </span>
      </HoverBorderGradient>
    </motion.div>
  );
}
