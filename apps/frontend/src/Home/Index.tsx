import { useEffect, useState } from "react";
// import { useStore } from "@repo/zustand";
import { Body } from "../body/Body";
import { Navbar } from "../body/Navbar/Navbar";
import { RingLoader } from "react-spinners";

const Home = () => {
  const [mainLoader, setMainLoader] = useState(true);

  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setMainLoader(false);
      }, 200);
    });
  }, []);

  if (mainLoader)
    return (
      <div className="flex items-center justify-center h-dvh w-full bg-white dark:bg-black">
        <div className="flex flex-col justify-center items-center gap-4 px-4 text-center">
          <RingLoader color="#7c3aed" size={80} />
          {/* <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            Loading ...
          </h1> */}
        </div>
      </div>
    );

  return (
    <div>
      <Navbar />
      <Body />
    </div>
  );
};

export default Home;
