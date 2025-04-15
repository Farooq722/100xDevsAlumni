import { InfiniteMovingCards } from "@repo/ui/uicomponents/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[15rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    title: "💼 Professional & Confident",
    quote:
      "100xDevs is an elite training program crafted to shape future-ready full-stack engineers. Build, deploy, and scale real-world applications like a pro.",
    name: "",
  },
  {
    quote:
      "100xDevs isn’t just a course — it’s your launchpad to full-stack mastery. Learn by building, ship real apps, and level up fast.",
    name: "",
    title: "🚀 Techy & Modern",
  },
  {
    quote:
      "From zero to full-stack hero — 100xDevs gives you the skills, mindset, and real-world experience to thrive in tech.",
    name: "",
    title: "⚡ Bold & Impactful",
  },
  {
    quote:
      "100xDevs trains developers to become full-stack engineers ready for production-level work — fast, hands-on, and career-focused.",
    name: "",
    title: "🎯 Straightforward & Crisp",
  },
  {
    quote:
      "Join the movement with 100xDevs — a powerful developer community where you learn fast, build big, and grow together.",
    name: "",
    title: "👨‍💻 Community + Growth",
  },
];
