import {
  //   useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../body/Navbar/Navbar";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface UserInfo {
  name: string;
  bio: string;
  avatar: string;
}

export const Timeline = ({
  data,
  info,
}: {
  data: TimelineEntry[];
  info: UserInfo[];
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div>
      <Navbar />

      <div
        className="w-full bg-gradient-to-br from-pink-50 via-teal-50 to-purple-50 font-sans md:px-10"
        ref={containerRef}
      >
        <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 lg:px-10 flex flex-col md:flex-row gap-10 md:justify-evenly items-center text-center md:text-left">
          <div className="flex flex-col justify-start md:mr-36">
            <h2 className="text-lg md:text-4xl mb-4 text-black max-w-4xl">
              Hey 👋 {info[0].name}
            </h2>
            <p className="text-neutral-700 text-sm md:text-base max-w-sm ">
              {info[0].bio}
            </p>
          </div>

          <p className="text-lg md:text-4xl mb-4 text-black max-w-4x flex justify-center md:justify-start items-center">
            <img
              src={info[0]?.avatar || "https://github.com/shadcn.png"}
              className="w-[300px] h-[300px] rounded-full object-cover"
              alt="Avatar"
            />
          </p>
        </div>

        <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex justify-start pt-10 md:pt-40 md:gap-10"
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black  flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-neutral-200  border border-neutral-300  p-2" />
                </div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 ">
                  {item.title}
                </h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500">
                  {item.title}
                </h3>
                {item.content}{" "}
              </div>
            </div>
          ))}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
