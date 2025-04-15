import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "@repo/ui/uicomponents/hero-highlight"
import { HoverBorderGradientDemo } from "./HoverBorderGradientDemo";

export function HeroHighlightDemo() {
  return (
    <div>
      <HeroHighlight>
        <HoverBorderGradientDemo text={"Connect with 100xDevs  🚀"}/>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-xl px-4 md:text-4xl mb-60 lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          
          Connect with peer&apos;s, build projects, and scale your tech journey fast. <br />
          <Highlight className="text-black dark:text-white">
          Network. Build. Scale.
          </Highlight>
        </motion.h1>
       
      </HeroHighlight>
    </div>
  );
}
