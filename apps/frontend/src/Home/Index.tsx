import { Body } from "../body/Body";
import { Navbar } from "../body/Navbar/Navbar";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";


export const Home = () => {

  const [loader, setLoader] = useState(true);
  
  useEffect(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        setLoader(false);
      }, 1000); 
    });
  }, []);

  if (loader)
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white dark:bg-black">
        <RingLoader color="#7c3aed" size={80} />
      </div>
    );

  return (
    <div className="">
      <Navbar />
      <Body />
    </div>
  );
};
